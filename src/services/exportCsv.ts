/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/exportCsv.ts
export const exportToCsv = (filename: string, rows: any[]) => {
  if (!rows || rows.length === 0) return;

  // Use the keys of the first row as header
  const header = Object.keys(rows[0]).join(",");

  const csvRows = rows.map((row) =>
    Object.values(row)
      .map(
        (value) => `"${String(value ?? "").replace(/"/g, '""')}"` // escape double quotes
      )
      .join(",")
  );

  const csvContent = [header, ...csvRows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
