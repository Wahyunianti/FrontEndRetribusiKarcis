import { Routes, Route } from "react-router-dom"
import DashboardPage from "./page/dashboard/DashboardPage"
import LoginPage from "./page/login/LoginPage"
import NotFoundPage from "./page/emptystate/NotFoundPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
