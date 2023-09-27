import './App.css'
import Home from './pages/home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
