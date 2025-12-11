import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-500 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ロゴ部分 */}
        <div className="text-xl font-bold text-white">
          <Link to="/">MyApp</Link>
        </div>

        {/* ナビゲーション */}
        <nav className="flex space-x-6 font-medium items-center justify-between">
          <Link to="/" className="text-white hover:font-bold">
            ホーム
          </Link>
          <Link to="/users" className="text-white hover:font-bold">
            部員
          </Link>
          <Link to="/users/:id" className="text-white hover:font-bold">
            <img
              src="../../public/kkrn_icon_user_1.png"
              alt="アイコン"
              className="w-10 h-10 transition-transform duration-200 hover:scale-110"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
