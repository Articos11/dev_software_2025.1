import React from 'react';

function SidebarSectionTitle ({text}) {

    return (
        <>
        <div className='flex items-center py-2 px-5 my-0.5 bg-violet-500'>
            <span className='text-1xl'>✨</span>
            <span className='text-base font-bold flex-grow ps-2'> {text} </span>
        </div>
        </>
    )
}

export default SidebarSectionTitle