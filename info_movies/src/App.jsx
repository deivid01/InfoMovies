import './App.css'
import Navbar from "./components/navbar"
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
