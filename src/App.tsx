import { Routes, Route } from "react-router-dom"
import DashboardPage from "./page/dashboard/DashboardPage"
import LoginPage from "./page/login/LoginPage"
import NotFoundPage from "./page/emptystate/NotFoundPage"
import GlobalErrorModal from "./page/components/GlobalErrorModal"
import DashboardManage from "./page/management/DashboardManage"
import './services/interceptor';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardManage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalErrorModal />
    </>
  );
}
export default App;