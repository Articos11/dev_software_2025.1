import React from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import FlashcardBox from "../components/FlashcardBox";

export default function MyFlashcardsPage() {
  return (
    <div>
      <PageHeaderSidebar>
        <PageHeader />
        <div className="flex flex-grow pl-22 h-full w-full overflow-y-hidden">
          <div className="flex grow-1 max-w-230 flex-wrap mt-20 gap-6 overflow-y-auto overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
            <FlashcardBox />
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
