import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <section className="section">
        <div className="container">
          <Outlet />
        </div>
      </section>
    </>
  );
}
