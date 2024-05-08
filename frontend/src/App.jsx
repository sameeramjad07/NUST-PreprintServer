import { 
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
