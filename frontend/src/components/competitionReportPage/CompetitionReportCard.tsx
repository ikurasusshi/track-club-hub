import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CompetitionReportCardProps {
  report: {
    id: number;
    body: string;
    user: {
      id: number;
      name: string;
    }
  }
}

export default function CompetitionReportCard({report}: CompetitionReportCardProps) {
  return (
    <>
      <Card className="w-xl">
        <CardHeader>
          <CardTitle>{report.user.name}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>{report.body}</CardContent>
      </Card>
    </>
  )
}