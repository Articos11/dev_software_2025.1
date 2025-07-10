import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SidebarTeste = () => {
  return (
    <>
      <Sidebar className="bg-white m-5 rounded-[45px] shadow-md">
        <Menu>
          <SubMenu label="Charts" className="mt-4 rounded-[30px]">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarTeste