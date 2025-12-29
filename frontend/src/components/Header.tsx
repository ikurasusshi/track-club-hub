import { House, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserMenu } from "./users/UserMenu";
import type { User } from "@/types/user";

interface HeaderProps {
  simple?: boolean;
}

const Header = ({ simple = false }: HeaderProps) => {
  // localStorageからユーザー情報を取得
  const userStr = localStorage.getItem("user");
  const user: User | null =
    userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  return (
    <header className="bg-white dark:bg-[rgb(14,29,51)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ロゴ部分 */}
        <div>
          <Button
            variant="ghost"
            asChild
            className="text-xl font-bold text-black dark:text-white"
          >
            <Link to="/">ClubHub</Link>
          </Button>
        </div>

        {/* ナビゲーション */}
        {!simple && (
          <nav className="flex space-x-6 font-medium items-center justify-between">
            <ModeToggle />
            <Button variant="ghost" asChild>
              <Link
                to="/"
                className="text-black dark:text-white hover:font-bold"
              >
                <House />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                to="/users"
                className="text-black dark:text-white hover:font-bold"
              >
                <UsersRound />
              </Link>
            </Button>
            {user && <UserMenu />}
          </nav>
        )}
      </div>
    </header>
  );
};
export default Header;
