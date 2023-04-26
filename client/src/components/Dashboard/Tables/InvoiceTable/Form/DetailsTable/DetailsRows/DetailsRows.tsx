import { TotalDetail } from "../../../../../../../interfaces";

import style from "./DetailsRows.module.css";

interface Props {
  detail: TotalDetail;
  handleChange: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
  handleRemove: (detailId: string) => void;
}

export default function DetailsRows({
  detail,
  handleChange,
  handleRemove,
}: Props) {
  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    handleChange(detail.id!, name, value);
  }

  return (
    <div className={style.row}>
      <input
        name="concepto"
        className="form-control"
        value={detail.concepto}
        placeholder="Concepto"
        onChange={handleLocalChange}
      />

      <input
        name="cantidad"
        className="form-control"
        value={detail.cantidad}
        placeholder="Cantidad"
        onChange={handleLocalChange}
      />

      <input
        name="baseImponible"
        className="form-control"
        value={detail.baseImponible}
        placeholder="Base Imponible"
        onChange={handleLocalChange}
      />

      <input
        name="ivaPorcentaje"
        className="form-control"
        value={detail.ivaPorcentaje}
        placeholder="% I.V.A."
        onChange={handleLocalChange}
      />

      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleRemove(detail.id!)}
      >
        -
      </button>
    </div>
  );
}
