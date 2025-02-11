import { Route, Routes } from "react-router-dom"
import { Homepage } from "../pages/HomePage"
import { RegisterPage } from "../pages/RegisterPage"
import { DashBoard } from "../pages/DashBoard"
import { ProtectedRoutes } from "../components/ProtectedRoutes"
import { ToastContainer, toast } from 'react-toastify';
import { UserProvider } from "../providers/UserContext"



export const RoutesMain = () =>{
    return (
      <UserProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route index element={<DashBoard />} />
          </Route>
        </Routes>
      </UserProvider>
    );
}