import { Link } from "react-router-dom";
import { Card } from "../ui/card";

interface UserCardProps {
  id: number;
  name: string;
  grade: number;
}

export default function UserCard({ id, name, grade }: UserCardProps) {
  return (
    <Card className="bg-white dark:bg-memberCard w-40 hover:shadow-lg transition-shadow duration-200 cursor-pointer p-2">
      <Link to={`/users/${id}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {name.charAt(0)}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="text-xs font-semibold truncate">{name}</h3>
            <span className="text-xs text-black  dark:text-white">
              {grade}年
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
