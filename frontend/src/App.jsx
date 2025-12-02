import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "./state/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import TutorialModal from "./components/TutorialModal.jsx";
import { LogoIcon } from "./components/Icons.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import CaseListPage from "./pages/cases/CaseListPage.jsx";
import CaseDetailPage from "./pages/cases/CaseDetailPage.jsx";
import CaseCreatePage from "./pages/cases/CaseCreatePage.jsx";
import HearingCalendarPage from "./pages/hearings/HearingCalendarPage.jsx";
import HearingCreatePage from "./pages/hearings/HearingCreatePage.jsx";
import UserApprovalPage from "./pages/admin/UserApprovalPage.jsx";
import DraftGeneratorPage from "./pages/ai/DraftGeneratorPage.jsx";
import NotificationPage from "./pages/notifications/NotificationPage.jsx";

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div>
      <header className="topbar fade-in-down">
        <div className="topbar-left">
          <LogoIcon />
          <span className="logo-text">AI Judiciary CMS</span>
        </div>
        <nav className="topbar-right">
          {user ? (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/cases">Cases</Link>
              <Link to="/hearings">Hearings</Link>
              <Link to="/hearings/new">Schedule Hearing</Link>
              <Link to="/ai/draft">AI Drafting</Link>
              <Link to="/notifications">Notifications</Link>
              {user.role === "ADMIN" && <Link to="/admin/users">Admin</Link>}
              <span className="topbar-user">
                {user.name} ({user.role})
              </span>
              <button onClick={logout} className="link-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="main fade-in">{children}</main>
      <TutorialModal />
    </div>
  );
};

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cases"
          element={
            <ProtectedRoute>
              <CaseListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cases/new"
          element={
            <ProtectedRoute roles={["ADVOCATE", "STAFF", "ADMIN"]}>
              <CaseCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cases/:id"
          element={
            <ProtectedRoute>
              <CaseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hearings"
          element={
            <ProtectedRoute>
              <HearingCalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hearings/new"
          element={
            <ProtectedRoute roles={["ADVOCATE", "STAFF", "ADMIN"]}>
              <HearingCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <UserApprovalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/draft"
          element={
            <ProtectedRoute roles={["ADVOCATE", "ADMIN", "STAFF"]}>
              <DraftGeneratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;


