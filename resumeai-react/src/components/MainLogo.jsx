import React from "react";

function MainLogo () {

    return (
        <div class="flex flex-col items-center">
            <div class="flex items-center justify-center mb-4">
                <span class="text-5xl mr-4 text-indigo-500">🧠</span>
                <div class="flex flex-col items-center space-y-1 mt-5">
                    <h1 class="text-[65px]/[1] font-bold text-indigo-500">ResumeAI</h1>
                    <p class="italic text-gray-500 text-lg">Da complexidade à <u>clareza</u></p>
                </div>
            </div>
        </div>
    )
}

export default MainLogo