import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <div style={{ width: "200px", background: "#eee" }}>
        <h3>Dashboard</h3>
        <Link to="profile">Profile</Link><br />
        <Link to="settings">Settings</Link>
      </div>

      {/* Content changes here */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}