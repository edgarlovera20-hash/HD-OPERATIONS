import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Eye, Edit, Download, Clock, User, Plus } from "lucide-react";

interface SOP {
  id: string;
  code: string;
  title: string;
  category: string;
  version: string;
  status: "active" | "review" | "todo" | "cancelled";
  owner: string;
  nextReview: string;
  views: number;
}

const SOPS: SOP[] = [
  { id: "1", code: "SOP-OPS-001", title: "Proceso de Onboarding de Nuevos Colaboradores", category: "RRHH", version: "3.2", status: "active", owner: "L.Torres", nextReview: "Jul 2026", views: 248 },
  { id: "2", code: "SOP-OPS-002", title: "Protocolo de Gestión de Incidencias Críticas", category: "Sistemas", version: "2.1", status: "active", owner: "C.Méndez", nextReview: "Sep 2026", views: 183 },
  { id: "3", code: "SOP-OPS-003", title: "Proceso de Aprobación de Compras", category: "Finanzas", version: "4.0", status: "active", owner: "M.García", nextReview: "Oct 2026", views: 312 },
  { id: "4", code: "SOP-OPS-004", title: "Manual de Atención al Cliente", category: "Servicio al Cliente", version: "2.5", status: "review", owner: "A.Martínez", nextReview: "Jun 2026", views: 421 },
  { id: "5", code: "SOP-OPS-005", title: "Protocolo de Seguridad de Información", category: "Seguridad", version: "5.1", status: "active", owner: "R.Silva", nextReview: "Ago 2026", views: 156 },
  { id: "6", code: "SOP-OPS-006", title: "Proceso de Cierre Mensual Financiero", category: "Finanzas", version: "1.8", status: "review", owner: "D.Ruiz", nextReview: "Jun 2026", views: 89 },
  { id: "7", code: "SOP-OPS-007", title: "Gestión de Inventario y Almacén", category: "Logística", version: "2.0", status: "todo", owner: "P.López", nextReview: "Dic 2026", views: 12 },
  { id: "8", code: "SOP-OPS-008", title: "Protocolo de Comunicación Interna", category: "Comunicación", version: "1.3", status: "active", owner: "L.Torres", nextReview: "Sep 2026", views: 267 },
  { id: "9", code: "SOP-OPS-009", title: "Proceso de Reclutamiento y Selección", category: "RRHH", version: "3.0", status: "active", owner: "M.García", nextReview: "Oct 2026", views: 198 },
  { id: "10", code: "SOP-OPS-010", title: "Gestión de Contratos con Proveedores", category: "Legal", version: "1.5", status: "active", owner: "R.Silva", nextReview: "Jul 2026", views: 145 },
  { id: "11", code: "SOP-OPS-011", title: "Evaluación de Desempeño Trimestral", category: "RRHH", version: "2.2", status: "todo", owner: "A.Martínez", nextReview: "Dic 2026", views: 5 },
  { id: "12", code: "SOP-OPS-012", title: "Protocolo de Manejo de Crisis", category: "Riesgos", version: "1.0", status: "cancelled", owner: "C.Méndez", nextReview: "N/A", views: 78 },
];

const STATUS_LABELS: Record<string, string> = {
  active: "Activo", review: "En Revisión", todo: "Borrador", cancelled: "Obsoleto",
};

export default function SOPsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Procedimientos Estándar"
        description="Biblioteca de SOPs y manuales operativos"
        actions={
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#0066FF,#00A3FF)" }}>
            <Plus className="w-4 h-4" />
            Nuevo SOP
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "SOPs Activos", value: SOPS.filter(s => s.status === "active").length, color: "#10B981" },
          { label: "En Revisión", value: SOPS.filter(s => s.status === "review").length, color: "#F59E0B" },
          { label: "Borradores", value: SOPS.filter(s => s.status === "todo").length, color: "#60A5FA" },
          { label: "Total Consultas", value: SOPS.reduce((a, s) => a + s.views, 0), color: "#A78BFA" },
        ].map(s => (
          <div key={s.label} className="bg-[#161F33] border border-white/[0.08] rounded-[14px] p-4 text-center">
            <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[#9CA3AF] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* SOPs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {SOPS.map(sop => (
          <div key={sop.id}
            className="bg-[#161F33] border border-white/[0.08] rounded-[14px] p-5 hover:border-[#0066FF]/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#60A5FA] font-mono block mb-1">
                  {sop.code} · v{sop.version}
                </span>
                <h3 className="text-white text-sm font-semibold leading-snug">{sop.title}</h3>
              </div>
              <StatusBadge status={sop.status} />
            </div>

            <span className="inline-block text-[10px] text-[#9CA3AF] bg-white/[0.06] px-2 py-0.5 rounded mb-3">
              {sop.category}
            </span>

            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-[10px] text-[#6B7280]">
                  <User className="w-3 h-3" /> {sop.owner}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#6B7280]">
                  <Clock className="w-3 h-3" /> {sop.nextReview}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-[#6B7280]">
                <Eye className="w-3 h-3" /> {sop.views}
              </span>
            </div>

            <div className="flex gap-2">
              {[
                { icon: Eye, label: "Ver", primary: true },
                { icon: Edit, label: "Editar", primary: false },
                { icon: Download, label: "PDF", primary: false },
              ].map(btn => (
                <button key={btn.label}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-[8px] text-xs transition-colors"
                  style={{
                    backgroundColor: btn.primary ? "rgba(0,102,255,0.15)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${btn.primary ? "rgba(0,102,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                    color: btn.primary ? "#60A5FA" : "#9CA3AF",
                  }}
                >
                  <btn.icon className="w-3 h-3" />
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
