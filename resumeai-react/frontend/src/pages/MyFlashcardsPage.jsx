import React from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import FlashcardBox from "../components/FlashcardBox";

export default function MyFlashcardsPage() {
  return (
    <div>
      <PageHeaderSidebar>
        <PageHeader />
        <div className="flex flex-grow pl-22 h-full w-full overflow-y-invisible">
          <div className="flex grow-1 max-w-220 flex-wrap mt-20 gap-x-6">
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
          </div>
        </div>
      </PageHeaderSidebar>
    </div>
  );
}
