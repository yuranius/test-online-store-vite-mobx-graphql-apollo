import './App.css'
import {BrowserRouter as Router, Routes} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";



function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
