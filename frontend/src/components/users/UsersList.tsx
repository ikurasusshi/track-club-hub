import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../../queries/userQueries";
import type { User } from "../../types/user";
import { Link } from "react-router-dom";

const BLOCKS = [
  { key: "Sprints", label: "短距離" },
  { key: "MiddleAndLongDistance", label: "中長距離" },
  { key: "Jumps", label: "跳躍" },
  { key: "Throws", label: "投擲" },
  { key: "Others", label: "その他" },
] as const;

const UsersList = () => {
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-red-500">
          エラーが発生しました: {error.message}
        </div>
      </div>
    );
  }

  const users = data?.users || [];

  // ブロックごとにユーザーをグループ化
  const usersByBlock = BLOCKS.map((block) => ({
    ...block,
    users: users.filter((user: User) => user.block === block.key),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">部員一覧</h1>
      <div className="space-y-8">
        {usersByBlock.map((block) => (
          <div key={block.key} className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {block.label}
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({block.users.length}名)
              </span>
            </h2>
            {block.users.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">該当する部員はいません</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {block.users.map((user) => (
                  <Link
                    key={user.id}
                    to={`/users/${user.id}`}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
