import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBoardStore } from "./store/boardStore";
import AuthLoginForm from "./pages/auth/Login.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import TaskBoardView from "./pages/dashboard/TaskBoardView.jsx";
import ErrorPage from "./pages/dashboard/ErrorPage.jsx";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useBoardStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={
            <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6 md:p-10">
              <AuthLoginForm />
            </div>
          } />

          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route index element={<TaskBoardView />} />
            <Route path="dashboard" element={<TaskBoardView />} />
            <Route path="error" element={<ErrorPage />} />

          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
