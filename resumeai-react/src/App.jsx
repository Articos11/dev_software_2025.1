import ResizableInputBar from './components/Sidebar/ResizableInputBar'
import Sidebar from './components/Sidebar/Sidebar'
import './index.css'

function App() {

  return (
    <>
      <div className='bg-white text-gray-800 h-screen w-screen flex'>
        <Sidebar/>
        <main className='flex-1 flex flex-col items-center relative p-6'>
          <div className='flex-grow'></div>
          <ResizableInputBar />
      </main>
      </div>

    </>
  )
}

export default App