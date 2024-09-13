import react from "react"
import { BrowserRouter, Routes, Route, Navigation } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
};

//It is important to have memeory clean when an user is registering, otherwise, can be troubles with old tokens
function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/">
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
