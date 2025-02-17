import { Route, Routes } from "react-router-dom"
import { Homepage } from "../pages/HomePage"
import { RegisterPage } from "../pages/RegisterPage"
import { DashBoard } from "../pages/DashBoard"
import { ProtectedRoutes } from "../components/ProtectedRoutes"
import { UserProvider } from "../providers/UserContext"
import { TechProvider } from "../providers/TechContext"



export const RoutesMain = () =>{
    return (
      <>
        <UserProvider>
          <TechProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<ProtectedRoutes />}>
                <Route index element={<DashBoard />} />
              </Route>
            </Routes>
          </TechProvider>
        </UserProvider>
      </>
    )
}