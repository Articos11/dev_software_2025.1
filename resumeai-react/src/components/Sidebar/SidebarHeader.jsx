import React from 'react';

function SidebarHeader () {
    return (
        <>
            <div className='flex justify-center my-4'>
                <div className='h-1 w-40 bg-gray-400 rounded-full'> </div>
            </div>

            <div className='flex justify-center'>
                <h1 class="text-2xl font-bold text-indigo-500">ResumeAI</h1>
            </div>
        </>
    )
}

export default SidebarHeader