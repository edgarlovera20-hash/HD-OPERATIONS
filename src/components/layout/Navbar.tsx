import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
  onMenuToggle?: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[#111827] border-b border-white/[0.08] flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-[#94A3B8] hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar tareas, proyectos..."
            className="pl-9 pr-4 py-2 bg-[#161F33] border border-white/[0.08] rounded-[10px] text-sm text-[#94A3B8] placeholder-[#6B7280] focus:outline-none focus:border-[#0066FF] focus:text-white w-72 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-[10px] bg-[#161F33] border border-white/[0.08] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#0066FF] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0066FF] border border-[#111827]" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-white/[0.08]">
          <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 flex items-center justify-center">
            <span className="text-[#0066FF] text-xs font-bold">
              {(user?.name ?? user?.email ?? "U").charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-white text-sm font-medium hidden sm:block">{user?.name ?? "Usuario"}</span>
        </div>
      </div>
    </header>
  );
}
