import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
import "../css/common.css";

export default function Layout() {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
