import { Outlet } from "react-router-dom";
import Header from "../Header";

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
