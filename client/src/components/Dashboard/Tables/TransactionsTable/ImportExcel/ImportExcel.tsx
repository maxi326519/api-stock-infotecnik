import * as XLSX from "xlsx";

import styles from "./ImportExcel.module.css";

interface Props {
  handleData: (data: any) => void;
  handleClose: () => void;
}

export default function ImportExcel({ handleData, handleClose }: Props) {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const worksheetData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });
        let newData = worksheetData.slice(3);
        newData = newData.filter((d: any) => d.length > 0);
        newData = newData.map((d: any) => ({
          fecha: XLSX.SSF.format("dd/mm/yyyy", d[0]),
          fechaValor: XLSX.SSF.format("dd/mm/yyyy", d[1]),
          movimiento: d[2],
          masDatos: d[3],
          importe: d[4],
          saldo: d[5],
        }))
        console.log(newData);
        handleData(newData);
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Importar movimientos</h4>
          <div
            className="btn-close"
            onClick={handleClose}
          />
        </div>
        <input
          className="form-control"
          type="file"
          placeholder="Importar movimientos"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}
