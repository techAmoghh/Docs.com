// src/components/Layout.jsx
import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main style={{ paddingTop: "60px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
