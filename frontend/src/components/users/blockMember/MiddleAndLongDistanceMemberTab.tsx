import type { User } from "../../../types/user";
import UserCard from "../UserCard";

interface MiddleAndLongDistanceMemberTabProps {
  users: User[];
}

export default function MiddleAndLongDistanceMemberTab({
  users,
}: MiddleAndLongDistanceMemberTabProps) {
  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          該当する部員はいません
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          grade={user.grade}
        />
      ))}
    </div>
  );
}
