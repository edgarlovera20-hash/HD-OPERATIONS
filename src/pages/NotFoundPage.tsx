import { useNavigate } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#0066FF] text-sm font-semibold mb-3 uppercase tracking-widest">Error 404</p>
        <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Página no encontrada
        </h1>
        <p className="text-[#94A3B8] text-base mb-8 max-w-md mx-auto">
          La página que buscas no existe o fue movida.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold px-6 py-3 rounded-[14px] transition-colors"
        >
          <Home className="w-4 h-4" />
          Ir al Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
