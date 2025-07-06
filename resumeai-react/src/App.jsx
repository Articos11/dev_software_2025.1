import MainPage from './components/MainPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<MainPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App