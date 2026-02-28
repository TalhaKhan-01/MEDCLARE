import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ReportView from './pages/ReportView';
import DoctorReview from './pages/DoctorReview';
import Evaluation from './pages/Evaluation';
import Footer from './components/Footer';

function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useAuth();
    if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
    if (!user) return <Navigate to="/login" />;
    if (requiredRole && user.role !== requiredRole) return <Navigate to="/dashboard" />;
    return children;
}

function AppRoutes() {
    const { user } = useAuth();
    return (
        <>
            {user && <Navbar />}
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                <Route path="/report/:id" element={<ProtectedRoute><ReportView /></ProtectedRoute>} />
                <Route path="/review/:id" element={<ProtectedRoute requiredRole="doctor"><DoctorReview /></ProtectedRoute>} />
                <Route path="/evaluation" element={<ProtectedRoute requiredRole="doctor"><Evaluation /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}
