import { Outlet } from "react-router-dom";

const NoHeaderLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NoHeaderLayout;
