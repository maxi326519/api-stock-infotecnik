import { useState } from "react";
import { TotalDetail, initDetail } from "../../../../../../interfaces";
import DetailsRows from "./DetailsRows/DetailsRows";

import style from "./DetailsTable.module.css";

interface Props {
  details: TotalDetail[];
  addDetail: (detail: TotalDetail) => void;
  removeDetails: (detailId: string) => void;
  changeDetail: (
    detailId: string,
    name: string,
    value: string | number
  ) => void;
}

export default function DetaisTable({
  details,
  addDetail,
  removeDetails,
  changeDetail,
}: Props) {
  const [newDetail, setNewDetail] = useState<TotalDetail>(initDetail);

  function handleLocalChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewDetail({ ...newDetail, [event.target.name]: event.target.value });
  }

  function handleAdd() {
    addDetail(newDetail);
  }

  function handleChange(
    detailId: string,
    name: string,
    value: string | number
  ) {
    changeDetail(detailId, name, value);
  }

  function handleRemove(detailId: string) {
    removeDetails(detailId);
  }

  return (
    <div className={style.grid}>
      <div className={`${style.row} ${style.firstRow}`}>
        <span>Concepto</span>
        <span>Cant.</span>
        <span>Precio</span>
        <span>IVA</span>
        <span></span>
      </div>
      <div className={style.contentCard}>
        {details.length <= 0 ? (
          <div className={style.listEmpty}>
            <span>No hay detalles</span>
          </div>
        ) : (
          details?.map((detail: TotalDetail) => (
            <DetailsRows
              key={detail.id}
              detail={detail}
              handleChange={handleChange}
              handleRemove={handleRemove}
            />
          ))
        )}
      </div>
      <div className={style.inputs}>
        <input
          id="concepto"
          name="concepto"
          type="text"
          value={newDetail.concepto}
          placeholder="Concepto"
          onChange={handleLocalChange}
        />
        <input
          id="cantidad"
          name="cantidad"
          type="number"
          value={newDetail.cantidad}
          placeholder="Cantidad"
          onChange={handleLocalChange}
        />
        <input
          id="baseImponible"
          name="baseImponible"
          type="number"
          value={newDetail.baseImponible}
          placeholder="Precio"
          onChange={handleLocalChange}
        />
        <input
          id="ivaPorcentaje"
          name="ivaPorcentaje"
          type="number"
          value={newDetail.ivaPorcentaje}
          placeholder="IVA"
          onChange={handleLocalChange}
        />
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
    </div>
  );
}
