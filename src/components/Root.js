import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
function RootLayout() {


  return (
    <>
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
