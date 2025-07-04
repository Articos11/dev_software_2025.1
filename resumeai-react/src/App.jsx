import Sidebar from './components/Sidebar/Sidebar'
import './index.css'

function App() {

  return (
    <>
      <div className='bg-white text-gray-800 h-screen w-screen flex'>
        <aside className="w-64 bg-gray-50 shadow-lg flex flex-col rounded-[40px] m-4 z-20">
          <div className="flex justify-center mt-6">
            <h1 className="text-xl font-bold text-indigo-500">📄 ResumeAI</h1>
          </div>
          <nav className="flex-1 p-4 space-y-3">
            <button className="w-full pl-3 flex items-center space-x-2 mb-2 rounded-md hover:bg-gray-100 transition">
              <span>🆕</span><span>Novo...</span>
            </button>
            <button className="w-full pl-3 flex items-center space-x-2 mb-2 rounded-md hover:bg-gray-100 transition">
              <span>🔍</span><span>Buscar</span>
            </button>
            
            <div className="space-y-2">
              <div className="flex flex-grow pl-3 mt-8 h-7 space-x-2 text-indigo-500 font-semibold bg-indigo-500 text-white">
                <span>🏠</span><span>Meu espaço</span>
              </div>
              <div className="pl-6 space-y-1">
                <button className="w-full flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 transition">
                  <span>📇</span><span>Flashcards</span>
                </button>
                <button className="w-full flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 transition">
                  <span>📝</span><span>Resumos</span>
                </button>
                <div>
                  <button className="w-full flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 transition">
                    <span>📁</span><span>Projetos</span>
                  </button>
                  <div className="flex ml-11">
                      <div className="w-[3px] bg-indigo-500 rounded-full"></div>
                      <ul className="ml-4 list-none text-xs space-y-[0.5px]">
                      <li className="flex items-center text-gray-700 hover:text-indigo-500 cursor-pointer transition py-1">
                          <span>Matemática Discreta</span>
                      </li>
                      <li className="flex items-center text-gray-700 hover:text-indigo-500 cursor-pointer transition py-1">
                          <span>Banco de Dados</span>
                      </li>
                      <li className="flex items-center text-gray-700 hover:text-indigo-500 cursor-pointer transition py-1">
                          <span>Javascript</span>
                      </li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <hr className="my-2 border-gray-200 mx-5"/>
          <div className="px-6 py-6 space-y-2">
            <div className="flex items-center space-x-2 text-gray-600"><span>💬</span><span>Suporte</span></div>
            <div className="flex items-center space-x-2 text-gray-600"><span>ℹ️</span><span>Sobre</span></div>
            <div className="flex items-center space-x-2 text-gray-600"><span>⚙️</span><span>Ajustes</span></div>
            <div className="mt-4 text-red-500 cursor-pointer text-center">Sair</div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col items-center relative p-8 z-20">
          <div className="absolute justify-end top-4 right-4 flex items-center space-x-2 bg-indigo-500 p-2 rounded-full shadow w-36">
              <div className="flex flex-col text-end">
                  <span className="text-white text-md">Usuário</span>
                  <span className="text-white text-xs">(online)</span>
              </div>
            <span className="flex items-center justify-center bg-white rounded-full w-10 h-10 ">👤</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="font-semibold text-gray-600">Etapa atual</span>
            <div className="flex space-x-2">
              <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">1</span>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm">2</span>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-10 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm">3</span>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm">4</span>
              </div>
            </div>
          </div>

          <div className="flex-grow"></div> 

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl mr-4 text-indigo-500">🧠</span>
              <div className="flex flex-col items-center space-y-1 mt-5">
                  <h1 className="text-[65px]/[1] font-bold text-indigo-500">ResumeAI</h1>
                  <p className="italic text-gray-500 text-lg">Da complexidade à <u>clareza</u></p>
              </div>
            </div>
            
          </div>

          <div className="flex-grow"></div> 

          <div className="w-full max-w-3xl flex items-center bg-gray-50 rounded-full shadow px-4 py-2 mb-4">
            <span className="text-gray-400 text-xl mr-2">📎</span>
            <input
              type="text"
              placeholder="Novo resumo rápido..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-gray-50"
            />
            <button className="text-indigo-500 text-2xl">⬆️</button>
          </div>
        </main>
      </div>
    </>
  )
}

export default App