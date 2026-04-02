import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from "./auth/page/register/RegisterPage"
import LoginPage from "./auth/page/login/LoginPage"
import UserTablePage from "./user/page/table/UserTablePage" 
import RegisterDataUpdate from './auth/page/register/component/RegisterDataUpdate'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-data-update/:id" element={<RegisterDataUpdate />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/table" element={<UserTablePage />} />
      </Routes>
    </Router>
  ) 
}

export default App