import React from "react";
import SideDrawer from "./SideDrawer/SideDrawer";
import Topbar from "./Topbar/Topbar";
import Content from "./Content/Content";
import { Switch, BrowserRouter } from "react-router-dom";


export default function Layout() {
  return (
    <>
      {/* <BrowserRouter> */}
      {/* <Switch> */}
      <SideDrawer />
      <Topbar />
      {/* <Content /> */}
      {/* </Switch> */}
      {/* </BrowserRouter> */}
    </>
  );
}
