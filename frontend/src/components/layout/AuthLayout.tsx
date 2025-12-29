import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function AuthLayout() {
  return (
    <div>
      <Header simple={true} />
      <Outlet />
    </div>
  );
}
