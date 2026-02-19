import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AttendanceReportCardProps {
  report: {
    id: number;
    date: string;
    status: string;
    reason: string;
    user: {
      id: number;
      name: string;
    }
  };
}

export default function AttendanceReportCard({
  report,
}: AttendanceReportCardProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ABSENT":
        return "欠席";
      case "LATE":
        return "遅刻";
      default:
        return status;
    }
  };

  return (
    <div>
      <Card className="w-xl">
        <CardHeader>
          <CardTitle>{getStatusLabel(report.status)}</CardTitle>
          <CardDescription>{report.user.name}</CardDescription>
        </CardHeader>
        <CardContent>{report.reason}</CardContent>
      </Card>
    </div>
  );
}
