import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  );
}
export default AppLayout;
