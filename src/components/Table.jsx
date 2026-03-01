function Table({ columns, data, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value, j) => (
                <td key={j}>{value}</td>
              ))}

              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;