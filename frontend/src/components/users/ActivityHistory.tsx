import { GET_ABSENT_DATES } from "@/queries/attendanceReportQueries";
import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  userId: number;
};

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function formatMonth(year: number, month: number) {
  return `${year}年${month + 1}月`;
}

function buildMonthDays(
  year: number,
  month: number,
  absentDates: Set<string>
) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // First day of month and number of days
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Rest days: Sunday (0) and Thursday (4)
  const restDays = new Set([0, 4]);

  const cells: {
    day: number | null;
    date: string;
    active: boolean;
    rest: boolean;
  }[] = [];

  // Leading empty cells
  for (let i = 0; i < startDow; i++) {
    cells.push({ day: null, date: "", active: false, rest: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dow = new Date(year, month, d).getDay();
    const isRest = restDays.has(dow);
    const isFuture = dateStr > todayStr;
    cells.push({
      day: d,
      date: dateStr,
      active: !isRest && !isFuture && !absentDates.has(dateStr),
      rest: isRest,
    });
  }

  // Group into weeks (rows of 7)
  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    while (week.length < 7) {
      week.push({ day: null, date: "", active: false, rest: false });
    }
    weeks.push(week);
  }

  return weeks;
}

const ActivityHistory = ({ userId }: Props) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const { data, loading } = useQuery<{
    getAbsentDates: { date: string }[];
  }>(GET_ABSENT_DATES, {
    variables: { userId },
  });

  const absentDates = useMemo(() => {
    const set = new Set<string>();
    if (data?.getAbsentDates) {
      for (const report of data.getAbsentDates) {
        set.add(report.date.split("T")[0]);
      }
    }
    return set;
  }, [data]);

  const weeks = useMemo(
    () => buildMonthDays(year, month, absentDates),
    [year, month, absentDates]
  );

  const handlePrev = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        活動履歴を読み込み中...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">活動履歴</h2>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="sm" onClick={handlePrev}>
          ←
        </Button>
        <span className="text-sm font-medium">{formatMonth(year, month)}</span>
        <Button variant="ghost" size="sm" onClick={handleNext}>
          →
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day of week headers */}
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-xs text-gray-500 dark:text-gray-400 pb-1"
          >
            {label}
          </div>
        ))}

        {/* Day cells */}
        {weeks.flat().map((cell, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md flex items-center justify-center text-xs relative overflow-hidden ${
              cell.day === null
                ? ""
                : cell.rest
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                  : cell.active
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
            title={cell.date}
          >
            {cell.day !== null && cell.rest && (
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="100%"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-400 dark:text-gray-500"
                />
              </svg>
            )}
            <span className="relative">{cell.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityHistory;
