import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

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
