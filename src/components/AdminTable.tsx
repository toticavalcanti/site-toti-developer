import { ReactNode } from 'react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
}

export default function AdminTable({ columns, data }: AdminTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="text-left px-4 py-3 font-semibold text-foreground"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-border hover:bg-background-tertiary transition-colors"
            >
              {columns.map((column) => (
                <td key={column.accessor} className="px-4 py-3 text-foreground-secondary">
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
