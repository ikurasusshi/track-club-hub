import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import AttendanceReportCard from "../attendanceReportCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CREATE_ATTENDANCE_REPORT } from "@/mutations/attendanceReportMutation";
import { GET_ATTENDANCE_REPORTS } from "@/queries/attendanceReportQueries";
import type { User, Block } from "@/types/user";
import { ME } from "@/queries/userQueries";

type AttendanceStatus = "ABSENT" | "LATE";

const BLOCK_LABELS: Record<Block, string> = {
  Sprints: "短距離",
  MiddleAndLongDistance: "中長距離",
  Jumps: "跳躍",
  Throws: "投擲",
  Others: "その他",
};

// ローカル時間でYYYY-MM-DD形式の日付を取得
const getLocalDateString = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface AttendanceReport {
  id: number;
  date: string;
  status: string;
  reason: string;
  user: {
    id: number;
    name: string;
  };
}

interface GetAttendanceReportsData {
  getAttendanceReports: AttendanceReport[];
}

const AbsenceReport = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [status, setStatus] = useState<AttendanceStatus>("ABSENT");
  const [reason, setReason] = useState("");

  // フィルター用のstate（undefinedの場合は自分のブロック）
  const [filterBlock, setFilterBlock] = useState<Block | undefined>(undefined);
  // デフォルトで今日の日付をフィルターに設定
  const [filterDate, setFilterDate] = useState(getLocalDateString());

  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery<{ me: User }>(ME);

  const [createAttendanceReport, { loading: createLoading }] = useMutation(
    CREATE_ATTENDANCE_REPORT,
    {
      refetchQueries: [GET_ATTENDANCE_REPORTS],
    }
  );

  // 選択されたブロック（デフォルトは自分のブロック）
  const selectedBlock = filterBlock ?? meData?.me.block;

  // 出席報告を取得
  const {
    data: getAttendanceReportsData,
    loading: getAttendanceReportsLoading,
    error: getAttendanceReportsError,
  } = useQuery<GetAttendanceReportsData>(GET_ATTENDANCE_REPORTS, {
    variables: { block: selectedBlock },
    skip: !selectedBlock,
  });

  if (meLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (meError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {meError.message}</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 今日の日付を取得（ローカル時間でYYYY-MM-DD形式）
    const today = getLocalDateString();

    try {
      await createAttendanceReport({
        variables: {
          createAttendanceReportInput: {
            date: today,
            status,
            reason,
            userId: meData?.me.id,
          },
        },
      });

      setStatus("ABSENT");
      setReason("");
      setIsFormVisible(false);
    } catch (err) {
      console.error("欠席連絡の投稿に失敗しました:", err);
      alert("欠席連絡の投稿に失敗しました");
    }
  };
  //  日付によるフィルター処理
  const filteredReportsByDate = filterDate
    ? getAttendanceReportsData?.getAttendanceReports?.filter((report) => {
        const reportDate = new Date(report.date).toISOString().split("T")[0];
        return reportDate === filterDate;
      })
    : getAttendanceReportsData?.getAttendanceReports;
  return (
    <>
      <div className="ml-43">
        <Button
          className="mb-5"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "キャンセル" : "投稿する"}
        </Button>
      </div>
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 ml-40 m p-6 border rounded-lg bg-card w-100 h-100"
        >
          <h2 className="text-xl font-bold mb-4">欠席連絡を投稿</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="status">ステータス</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as AttendanceStatus)}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABSENT">欠席</SelectItem>
                  <SelectItem value="LATE">遅刻</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reason">理由</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="欠席・遅刻の理由を入力してください"
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={createLoading}>
              {createLoading ? "投稿中..." : "投稿"}
            </Button>
          </div>
        </form>
      )}
      <div className="border-b mb-10"></div>

      <div className="mb-6 ml-43 space-y-4">
        {/* ブロックフィルター */}
        <div>
          <Label>ブロックで絞り込み</Label>
          <Select
            value={selectedBlock}
            onValueChange={(value) => setFilterBlock(value as Block)}
          >
            <SelectTrigger className="mt-1 w-64">
              <SelectValue placeholder="ブロックを選択" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(BLOCK_LABELS) as Block[]).map((block) => (
                <SelectItem key={block} value={block}>
                  {BLOCK_LABELS[block]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 日付フィルター */}
        <div>
          <Label htmlFor="filterDate">日付で絞り込み</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="filterDate"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-64"
            />
          </div>
        </div>
      </div>

      {/* 欠席連絡一覧 */}
      <div className="space-y-4">
        {getAttendanceReportsLoading && <p>読み込み中...</p>}
        {getAttendanceReportsError && (
          <p>エラーが発生しました: {getAttendanceReportsError.message}</p>
        )}
        {filteredReportsByDate?.map((report: AttendanceReport) => (
          <AttendanceReportCard key={report.id} report={report}/>
        ))}
        {!getAttendanceReportsLoading &&
          !getAttendanceReportsError &&
          filteredReportsByDate?.length === 0 && (
            <p className="text-muted-foreground">
              {filterDate
                ? "選択した日付の欠席連絡はありません"
                : "欠席連絡はまだありません"}
            </p>
          )}
      </div>
    </>
  );
};

export default AbsenceReport;
