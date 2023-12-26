import React from 'react';
import {NavBar} from "./NavBar.tsx";
import {Outlet} from "react-router-dom";

export const Layout: React.FC = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);
