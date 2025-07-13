import React from "react";
import MainLogo from "../components/MainLogo";
import ResizableInputBar from "../components/ResizableInputBar";
import PageHeaderSidebar from "../components/PageHeaderSidebar";

function MainPage() {
  return (
    <PageHeaderSidebar>
      <div className="flex-grow max-h-45"></div>
      <MainLogo />
      <div className="flex-grow"></div>
      <ResizableInputBar />
    </PageHeaderSidebar>
  );
}

export default MainPage;
