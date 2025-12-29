import { useQuery } from "@apollo/client/react";
import { ME } from "@/queries/userQueries";
import type { User } from "@/types/user";

const MyProfilePage = () => {
  const { loading, error, data } = useQuery<{ me: User }>(ME);

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

  const user = data?.me;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">ユーザー情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">マイプロフィール</h1>
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
              メールアドレス
            </label>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ブロック
            </label>
            <p className="text-lg font-semibold">{user.block}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              学年
            </label>
            <p className="text-lg font-semibold">{user.grade}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
