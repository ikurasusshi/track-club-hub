import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_COMPETITION_REPORTS, GET_MY_COMPETITION_REPORTS } from "@/queries/competitionReportQueries";
import CompetitionReportCard from "./CompetitionReportCard";
import { CREATE_COMPETITION_REPORT } from "@/mutations/competitionReportMutation";
import { ME } from "@/queries/userQueries";
import type { User } from "@/types/user";

interface CompetitionReport {
  id: number;
  body: string;
  user: {
    id: number;
    name: string;
  }
}

interface GetCompetitionReportsData {
  getCompetitionReports: CompetitionReport[];
}

const CompetitionReport = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [body, setBody] = useState("");
  const {
      loading: meLoading,
      error: meError,
      data: meData,
    } = useQuery<{ me: User }>(ME);
    
    const {
    loading: getCompetitionReportsLoading,
    error: getCompetitionReportsError,
    data: getCompetitionReportsData,
  } = useQuery<GetCompetitionReportsData>(GET_COMPETITION_REPORTS);

  const {
    loading: getMyCompetitionReportsLoading,
    error: getMyCompetitionReportsError,
    data: getMyCompetitionReportsData,
  } = useQuery<GetCompetitionReportsData>(GET_MY_COMPETITION_REPORTS, {
    variables: { userId: meData?.me.id },
  });

  const [createCompetitionReport, {loading: createCompetitionReportLoading}] = useMutation(
    CREATE_COMPETITION_REPORT,
    {
      refetchQueries: [{ query: GET_COMPETITION_REPORTS }, { query: GET_MY_COMPETITION_REPORTS, variables: { userId: meData?.me.id } }],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createCompetitionReport({
        variables: {
          createCompetitionReportInput: {
            body,
            userId: meData?.me.id,
          },
        },
      });
      setBody("");
      setIsFormVisible(false);
    } catch (error) {
      console.error("試合報告の作成に失敗しました。", error);
      alert("試合報告の作成に失敗しました。");
    }
  }

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

  if (getCompetitionReportsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (getCompetitionReportsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {getCompetitionReportsError.message}</div>
      </div>
    );
  }

  if (getMyCompetitionReportsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (getMyCompetitionReportsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {getMyCompetitionReportsError.message}</div>
      </div>
    );
  }

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
          className="mb-8 ml-40 p-6 border rounded-lg bg-card w-100 h-100"
        >
          <h2>試合報告をする</h2>
          <div className="space-y-4">
            <div>
              <Textarea
                id="matchReport"
                placeholder="試合の内容を入力してください"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={createCompetitionReportLoading}>
              {createCompetitionReportLoading ? "投稿中..." : "投稿"}
            </Button>
          </div>
        </form>
      )}
      <div className="border-b mb-10"></div>


      {/* 試合報告一覧 */}
      <div className="space-y-4">
        {getCompetitionReportsLoading && <p>読み込み中...</p>}
        {getCompetitionReportsError && (
          <p>エラーが発生しました: {getCompetitionReportsError.message}</p>
        )}
        {getCompetitionReportsData && getCompetitionReportsData?.getCompetitionReports?.map((report: CompetitionReport) => (
          <CompetitionReportCard key={report.id} report={report} />
        ))}
      </div>
    </>
  )
};

export default CompetitionReport;
