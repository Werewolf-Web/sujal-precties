import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./auth/page/register/RegisterPage";
import LoginPage from "./auth/page/login/LoginPage";
import UserTablePage from "./user/page/table/UserTablePage";
import RegisterDataUpdate from "./auth/page/register/component/RegisterDataUpdate";
import Settings from "./testing/Settings";
import Profile from "./testing/Profile";
import Home from "./testing/Home";
import Counter from "./features/counter/Counter";
import Todo from "./features/todo-store/Todo";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-data-update/:id"element={<RegisterDataUpdate />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/table" element={<UserTablePage />} />
        {/* =================== */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Counter" element={<Counter/>} />
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </Router>
  );
};

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./testing/Home";
// import DashboardLayout from "./testing/DashboardLayout";
// import Profile from "./testing/Profile";
// import Settings from "./testing/Settings";
// import DashboardHome from "./testing/DashboardHome";
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Normal route */}
//         {/* <Route path="/" element={<Home/>} /> */}

//         {/* Nested routes */}Full Name	Email	Password	Status	Action

//       <Route path="/dashboard" element={<DashboardLayout />}>
//   <Route index element={<DashboardHome />} />
//   <Route path="profile" element={<Profile />} />
//   <Route path="settings" element={<Settings />} />
// </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }
