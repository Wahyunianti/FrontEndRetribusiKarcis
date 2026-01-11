import { Routes, Route, Navigate } from "react-router-dom"
import DashboardPage from "./page/dashboard/DashboardPage"
import LoginPage from "./page/login/LoginPage"
import NotFoundPage from "./page/emptystate/NotFoundPage"
import GlobalErrorModal from "./page/components/GlobalErrorModal"
import DashboardManage from "./page/management/DashboardManage"
import DataUser from "./page/management/DataUser"
import DataJenisKarcis from "./page/management/DataJenisKarcis"
import DataZona from "./page/management/DataZona"
import DataRetribusi from "./page/management/DataRetribusi"
import DataTransaksi from "./page/management/DataTransaksi"
import './services/interceptor';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardManage />}>
          <Route index element={<Navigate to="transaksi" replace />} />
          <Route path="users" element={<DataUser />} />
          <Route path="zona" element={<DataZona />} />
          <Route path="karcis" element={<DataJenisKarcis />} />
          <Route path="retribusi" element={<DataRetribusi />} />
          <Route path="transaksi" element={<DataTransaksi />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalErrorModal />
    </>
  );
}
export default App;