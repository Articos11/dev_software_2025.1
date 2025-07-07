import MainPage from './components/MainPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import CheckInfosPage from './components/CheckInfosPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<MainPage />}></Route>
        <Route path='/ConferirTexto' element={<CheckInfosPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App