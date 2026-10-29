function DataTable({ columns, rows, rowKey = "id", emptyMessage = "Nenhum registro encontrado.", emptyIcon = "📭", className = "admin-table" }) {
  return (
    <div className="admin-table-wrapper">
      <table className={className}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="data-table-empty" role="status">
                  <span aria-hidden="true">{emptyIcon}</span>
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : rows.map((row) => (
            <tr key={rowKey ? row[rowKey] : row.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
