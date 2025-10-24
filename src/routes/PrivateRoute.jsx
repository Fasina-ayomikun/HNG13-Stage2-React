import { Navigate } from "react-router-dom";
import { isAuthed } from "../utils/auth";

export default function PrivateRoute({ children }) {
  return isAuthed() ? children : <Navigate to='/auth/login' replace />;
}
