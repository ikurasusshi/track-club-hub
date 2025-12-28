import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Header = () => {
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
        <nav className="flex space-x-6 font-medium items-center justify-between">
          <ModeToggle />
          <Button variant="ghost" asChild>
            <Link
              to="/users"
              className="text-black dark:text-white hover:font-bold"
            >
              <User />
            </Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-full">
            <Link to="/users">
              <Avatar>
                <AvatarImage
                  src="../../public/kkrn_icon_user_1.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
export default Header;
