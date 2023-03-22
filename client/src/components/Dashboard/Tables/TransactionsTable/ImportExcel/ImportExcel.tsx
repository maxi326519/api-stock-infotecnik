import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ImportExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const worksheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(worksheetData);
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" placeholder="Importar movimientos" onChange={handleFileChange} />
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell: any, cellIndex: any) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
