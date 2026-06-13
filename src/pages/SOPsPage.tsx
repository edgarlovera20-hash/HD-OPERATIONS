import { useState } from "react";
import { FileText, Download, Eye, Edit, Clock, User } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";

interface SOP {
  id: string;
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  owner: string;
  description: string;
}

const sops: SOP[] = [
  { id: "SOP-001", name: "Proceso de Onboarding de Empleados", category: "RH", version: "v2.3", lastUpdated: "05 Jun 2026", owner: "Ana López", description: "Procedimiento completo para incorporación de nuevos colaboradores, desde firma de contrato hasta entrega de equipo." },
  { id: "SOP-002", name: "Protocolo de Atención a Clientes", category: "Ventas", version: "v1.8", lastUpdated: "01 Jun 2026", owner: "Laura Díaz", description: "Guía estándar para atención y seguimiento de clientes potenciales y actuales." },
  { id: "SOP-003", name: "Gestión de Incidencias TI", category: "TI", version: "v3.1", lastUpdated: "28 May 2026", owner: "Miguel Torres", description: "Proceso de escalamiento, diagnóstico y resolución de incidencias tecnológicas." },
  { id: "SOP-004", name: "Proceso de Facturación Mensual", category: "Finanzas", version: "v2.0", lastUpdated: "31 May 2026", owner: "Carlos Ruiz", description: "Ciclo completo de generación, validación y envío de facturas a clientes." },
  { id: "SOP-005", name: "Cierre Contable Mensual", category: "Finanzas", version: "v1.5", lastUpdated: "31 May 2026", owner: "Carlos Ruiz", description: "Procedimiento de cierre de período contable incluyendo conciliaciones y ajustes." },
  { id: "SOP-006", name: "Reclutamiento y Selección de Personal", category: "RH", version: "v2.1", lastUpdated: "10 May 2026", owner: "Ana López", description: "Proceso integral desde publicación de vacante hasta contratación del candidato seleccionado." },
  { id: "SOP-007", name: "Gestión de Proveedores y Compras", category: "Operaciones", version: "v1.4", lastUpdated: "15 May 2026", owner: "Paola Sánchez", description: "Flujo de solicitud, aprobación y pago a proveedores externos." },
  { id: "SOP-008", name: "Seguridad de Sistemas y Accesos", category: "TI", version: "v2.6", lastUpdated: "20 May 2026", owner: "Miguel Torres", description: "Políticas de gestión de contraseñas, permisos y acceso a sistemas críticos." },
  { id: "SOP-009", name: "Proceso de Nómina Quincenal", category: "Finanzas", version: "v1.9", lastUpdated: "01 Jun 2026", owner: "Sofia Mendez", description: "Cálculo, validación y dispersión de pagos de nómina a todos los colaboradores." },
  { id: "SOP-010", name: "Capacitación y Desarrollo de Talento", category: "RH", version: "v1.2", lastUpdated: "18 Apr 2026", owner: "Ricardo García", description: "Plan de formación continua para el equipo operativo y de soporte." },
  { id: "SOP-011", name: "Respaldo y Recuperación de Datos", category: "TI", version: "v2.0", lastUpdated: "25 May 2026", owner: "Miguel Torres", description: "Procedimiento de backup diario, semanal y mensual con pruebas de restauración." },
  { id: "SOP-012", name: "Auditoría Interna de Procesos", category: "Operaciones", version: "v1.1", lastUpdated: "15 Apr 2026", owner: "Paola Sánchez", description: "Revisión periódica del cumplimiento de procesos y políticas internas." },
];

type Category = "Todos" | "RH" | "Ventas" | "Operaciones" | "TI" | "Finanzas";

const categories: Category[] = ["Todos", "RH", "Ventas", "Operaciones", "TI", "Finanzas"];

const categoryColors: Record<string, { color: string; bg: string }> = {
  RH: { color: "#0066FF", bg: "rgba(0,102,255,0.12)" },
  Ventas: { color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  Operaciones: { color: "#00A3FF", bg: "rgba(0,163,255,0.12)" },
  TI: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  Finanzas: { color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

export default function SOPsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filteredSops =
    activeCategory === "Todos"
      ? sops
      : sops.filter((s) => s.category === activeCategory);

  return (
    <div>
      <PageHeader
        title="Procedimientos Estándar (SOPs)"
        description="Repositorio de procesos y procedimientos operativos de Heavenly Dreams"
      />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-[#0066FF] text-white"
                : "bg-[#161F33] text-[#94A3B8] hover:text-white border border-white/[0.08]"
            }`}
          >
            {cat}
            {cat !== "Todos" && (
              <span className="ml-1.5 opacity-60">
                ({sops.filter((s) => s.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* SOPs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredSops.map((sop) => {
          const catStyle = categoryColors[sop.category] ?? { color: "#94A3B8", bg: "rgba(148,163,184,0.12)" };
          return (
            <div
              key={sop.id}
              className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-4 hover:border-[#0066FF]/30 transition-all"
            >
              {/* Icon + Category */}
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: catStyle.bg }}>
                  <FileText className="w-5 h-5" style={{ color: catStyle.color }} />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ color: catStyle.color, background: catStyle.bg }}
                  >
                    {sop.category}
                  </span>
                  <span className="text-xs text-[#94A3B8] bg-white/[0.05] px-2 py-1 rounded-full">
                    {sop.version}
                  </span>
                </div>
              </div>

              {/* Name + Description */}
              <div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {sop.name}
                </h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed line-clamp-2">{sop.description}</p>
              </div>

              {/* Meta */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                  <Clock className="w-3 h-3" />
                  <span>Actualizado: {sop.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                  <User className="w-3 h-3" />
                  <span>Responsable: {sop.owner}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05]">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] bg-[#0066FF]/10 hover:bg-[#0066FF]/20 text-[#0066FF] text-xs font-medium transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  Ver
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] text-xs font-medium transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                  Editar
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] text-xs font-medium transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
