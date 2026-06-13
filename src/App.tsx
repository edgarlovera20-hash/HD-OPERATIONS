import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { DashboardShell } from "./components/layout/DashboardShell";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import ProjectsPage from "./pages/ProjectsPage";
import TicketsPage from "./pages/TicketsPage";
import SOPsPage from "./pages/SOPsPage";
import NotFoundPage from "./pages/NotFoundPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <DashboardShell>{children}</DashboardShell>
    </RequireAuth>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <DashboardPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedLayout>
            <TasksPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedLayout>
            <ProjectsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedLayout>
            <TicketsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/sops"
        element={
          <ProtectedLayout>
            <SOPsPage />
          </ProtectedLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
