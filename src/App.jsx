import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Tickets from "./pages/tickets/Tickets";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />

        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/tickets'
          element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          }
        />
        <Route
          path='/tickets/new'
          element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}
