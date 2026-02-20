import { GET_USERS, ME } from "@/queries/userQueries";
import type { User } from "@/types/user";
import { formatBlock } from "@/utils/blockFormatter";
import { formatGrade } from "@/utils/gradeFormatter";
import { useQuery } from "@apollo/client/react";
import { Navigate, useParams } from "react-router-dom";
import ActivityHistory from "./ActivityHistory";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ getUsers: User[] }>(GET_USERS);
  const { data: meData } = useQuery<{ me: User }>(ME);

  if (meData?.me.id === Number(id)) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const user = data?.getUsers.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">ユーザー情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold pb-4">プロフィール</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              名前
            </label>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ブロック
            </label>
            <p className="text-lg font-semibold">{formatBlock(user.block)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              学年
            </label>
            <p className="text-lg font-semibold">{formatGrade(user.grade)}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
        <ActivityHistory userId={user.id} />
      </div>
    </div>
  );
};

export default UserDetailPage;
