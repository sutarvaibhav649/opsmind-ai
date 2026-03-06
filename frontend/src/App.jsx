import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import { useAuth } from "./context/AuthContext";

function App() {
    const { isAuthenticated } = useAuth();
    return (
        <Routes>

            {/* Root route */}
            <Route
                path="/"
                element={
                    isAuthenticated ? <Navigate to="/chat" replace /> : <LandingPage />
                }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/chat/:sessionId" element={<ChatPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>

        </Routes>
    );
}

export default App;