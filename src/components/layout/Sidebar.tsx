import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ClipboardCheck, CheckSquare, Briefcase, AlertCircle,
  FileText, Workflow, Users, BarChart3, TrendingUp, Settings, LogOut,
  ChevronDown, Layers,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
  label: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navSections: Array<{ section: string; items: NavItem[] }> = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Operaciones",
    items: [
      { label: "Tareas", path: "/tasks", icon: CheckSquare },
      { label: "Proyectos", path: "/projects", icon: Briefcase },
      { label: "Kanban", path: "/tasks", icon: Layers },
    ],
  },
  {
    section: "Soporte",
    items: [
      { label: "Tickets", path: "/tickets", icon: AlertCircle },
    ],
  },
  {
    section: "Procesos",
    items: [
      { label: "SOPs", path: "/sops", icon: FileText },
      { label: "Flujos", path: "/sops", icon: Workflow },
    ],
  },
  {
    section: "Recursos",
    items: [
      { label: "Equipos", path: "/dashboard", icon: Users },
    ],
  },
  {
    section: "Reportes",
    items: [
      { label: "KPIs", path: "/dashboard", icon: TrendingUp },
      { label: "Productividad", path: "/dashboard", icon: BarChart3 },
    ],
  },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function toggleSection(section: string) {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-[#111827] border-r border-white/[0.08] flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.08]">
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}>
          <ClipboardCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-white text-base leading-tight block" style={{ fontFamily: "Poppins, sans-serif" }}>
            HD OPS
          </span>
          <span className="text-[10px] text-[#94A3B8]">Operations Center</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navSections.map(({ section, items }) => (
          <div key={section} className="mb-4">
            <button
              onClick={() => toggleSection(section)}
              className="flex items-center justify-between w-full px-2 py-1 mb-1 group"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8] group-hover:text-white transition-colors">
                {section}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-[#94A3B8] transition-transform ${collapsed[section] ? "-rotate-90" : ""}`}
              />
            </button>
            {!collapsed[section] && (
              <div className="space-y-0.5">
                {items.map((item) => (
                  <NavLink
                    key={item.label + (item.path ?? "")}
                    to={item.path ?? "#"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition-all group ${
                        isActive
                          ? "bg-[#0066FF]/15 text-[#0066FF] font-medium"
                          : "text-[#94A3B8] hover:bg-white/[0.05] hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom: Settings + User */}
      <div className="px-3 py-4 border-t border-white/[0.08] space-y-1">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm text-[#94A3B8] hover:bg-white/[0.05] hover:text-white transition-all"
        >
          <Settings className="w-4 h-4" />
          Configuración
        </NavLink>
        <div className="flex items-center gap-3 px-3 py-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#0066FF] text-xs font-bold">
              {(user?.name ?? user?.email ?? "U").charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name ?? "Usuario"}</p>
            <p className="text-[#94A3B8] text-[10px] truncate">{user?.email ?? ""}</p>
          </div>
          <button onClick={handleLogout} title="Cerrar sesión" className="text-[#94A3B8] hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
