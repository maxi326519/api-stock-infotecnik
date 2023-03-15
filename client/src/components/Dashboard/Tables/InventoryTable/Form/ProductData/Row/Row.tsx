import { useState } from "react";
import { Stock, BarCode } from "../../../../../../../interfaces";
import isBarCodeValid from "../../../../../../../functions/barCodes";
import isValidIMEI from "../../../../../../../functions/IMEI";
import calcularIVA from "../../../../../../../functions/IVA";

import AddImages from "../../AddImages/AddImages";

import styles from "./Row.module.css";
import img from "../../../../../../../assets/svg/image.svg";

interface Props {
  product: string;
  tipoImpositivo: string;
}

const initialStock: Stock = {
  id: "",
  status: "Nuevo",
  IMEISerie: "",
  TipoCodigoDeBarras: "",
  codigoDeBarras: "",
  precioSinIVA: 0,
  precioIVA: 0,
  precioIVAINC: 0,
  imagen: "",
  ProductId: "",
  InvoiceId: "",
};

export default function Row({ product, tipoImpositivo }: Props) {
  const [newStock, setStock] = useState<Stock>(initialStock);
  const [imagesForm, setImagesForm] = useState(false);

  function handleClose(): void {
    setImagesForm(!imagesForm);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = event.target.name;
    const value: string = event.target.value;

    if (name === "precioSinIVA" || name === "precioIVA") {
      setStock({ ...newStock, ...calcularIVA(tipoImpositivo, name, value) })
    } else {
      setStock({ ...newStock, [name]: value });
    }
  }

  function handleValidation(name: string, value: any) {
    if (name === "codigoDeBarras") {
      isBarCodeValid(newStock.TipoCodigoDeBarras, value);
    }
    if (name === "IMEISerie") {
      isValidIMEI(value);
    }
  }

  return (
    <div className={styles.container}>
      {imagesForm ? (
        <AddImages
          handleClose={handleClose}
          newStock={newStock}
          setStock={setStock}
        />
      ) : null}
      <span>{product}</span>
      <div className={styles.item}>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="TipoCodigoDeBarras"
            name="TipoCodigoDeBarras"
          >
            <option value={BarCode.Coded128}>Code 128</option>
            <option value={BarCode.Code39}>Code 39</option>
            <option value={BarCode.UPCA}>UPC-A</option>
            <option value={BarCode.UPCE}>UPC-E</option>
            <option value={BarCode.EAN8}>EAN-8</option>
            <option value={BarCode.EAN13}>EAN-13</option>
          </select>
          <label htmlFor="TipoCodigoDeBarras">Seleccionar</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="codigoDeBarras"
            name="codigoDeBarras"
          />
          <label htmlFor="codigoDeBarras">Code</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="IMEISerie"
            name="IMEISerie"
            onChange={handleChange}
          />
          <label htmlFor="IMEISerie">Nro de Serie/IMEI </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="precioSinIVA"
            name="precioSinIVA"
            value={newStock.precioSinIVA}
            onChange={handleChange}
          />
          <label htmlFor="precioSinIVA">Precio </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="precioIVA"
            name="precioIVA"
            value={newStock.precioIVA}
            onChange={handleChange}
          />
          <label htmlFor="precioIVA">Precio I.V.A.</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="precioIVAINC"
            name="precioIVAINC"
            value={newStock.precioIVAINC}
            onChange={handleChange}
          />
          <label htmlFor="precioIVAINC">Precio de venta</label>
        </div>
        {/* {Agregar si es visible o no} */}
        <button className="btn btn-primary" type="button" onClick={handleClose}>
          <img src={img} alt="img" />
        </button>
      </div>
      <button className="btn btn-primary" type="button">
        +
      </button>
    </div>
  );
}
