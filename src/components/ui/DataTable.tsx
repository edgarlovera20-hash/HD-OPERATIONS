interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, emptyMessage = "Sin datos" }: DataTableProps<T>) {
  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-4 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-[#94A3B8] text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-sm text-[#94A3B8]">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
