import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CompetitionReportCardProps {
  report: {
    id: number;
    competitionName: string;
    body: string;
    user: {
      id: number;
      name: string;
    } 
  }
}


export default function CompetitionReportCard({report}: CompetitionReportCardProps) {
  console.log(report)
  return (
    <>
      <Card className="w-xl">
        <CardHeader>
          <CardTitle>{report.competitionName}</CardTitle>
          <CardDescription>{report.user.name}</CardDescription>
        </CardHeader>
        <CardContent className="whitespace-pre-wrap">{report.body}</CardContent>
      </Card>
    </>
  )
}