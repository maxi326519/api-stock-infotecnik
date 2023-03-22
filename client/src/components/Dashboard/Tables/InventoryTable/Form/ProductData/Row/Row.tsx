import { useEffect, useState } from "react";
import {
  Stock,
  BarCode,
  TipoImpositivo,
  Product,
  RootState,
} from "../../../../../../../interfaces";
import isBarCodeValid from "../../../../../../../functions/barCodes";
import isValidIMEI from "../../../../../../../functions/IMEI";
import calcularIVA from "../../../../../../../functions/IVA";

import AddImages from "../../AddImages/AddImages";

import styles from "./Row.module.css";
import img from "../../../../../../../assets/svg/image.svg";
import { useSelector } from "react-redux";

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

interface Props {
  id: string;
  tipoImpositivo: TipoImpositivo;
}

export default function Row({ id, tipoImpositivo }: Props) {
  const products = useSelector((state: RootState) => state.products);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [newStock, setStock] = useState<Stock>(initialStock);
  const [imagesForm, setImagesForm] = useState(false);

  useEffect(() => {
    const product = products.find((p) => p.id === id);
    setCurrentProduct(product);
  }, [products, id])

  function handleClose(): void {
    setImagesForm(!imagesForm);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = event.target.name;
    const value: string = event.target.value;

    if (name === "precioSinIVA" || name === "precioIVA") {
      setStock({ ...newStock, ...calcularIVA(tipoImpositivo, name, value) });
    } else {
      setStock({ ...newStock, [name]: value });
    }
    handleValidation(name, value);
  }

  function handleValidation(name: string, value: any) {
    if (name === "codigoDeBarras") {
      console.log(isBarCodeValid(newStock.TipoCodigoDeBarras, value));
    }
    if (name === "IMEISerie") {
      console.log(isValidIMEI(value));
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
      <div className={styles.productData}>
        <span>{currentProduct?.marca}</span>
        <span>{currentProduct?.modelo}</span>
      </div>
      <div className={styles.item}>
        <div className={styles.image} onClick={handleClose}>
          <img src={img} alt="img" />
        </div>
        <div className={styles.codes}>
          <div className={styles.top}>
            <div className="form-floating ">
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
            <div className="form-floating">
              <input
                className="form-control"
                id="codigoDeBarras"
                name="codigoDeBarras"
              />
              <label htmlFor="codigoDeBarras">Code</label>
            </div>
          </div>

          <div className="form-floating">
            <input
              className="form-control"
              id="IMEISerie"
              name="IMEISerie"
              onChange={handleChange}
            />
            <label htmlFor="IMEISerie">Nro de Serie/IMEI </label>
          </div>
        </div>

        <div className={styles.price}>
          <div>
            <div className={styles.top}>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="precioSinIVA"
                  name="precioSinIVA"
                  value={newStock.precioSinIVA}
                  onChange={handleChange}
                />
                <label htmlFor="precioSinIVA">Precio </label>
              </div>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="precioIVA"
                  name="precioIVA"
                  value={newStock.precioIVA}
                  onChange={handleChange}
                />
                <label htmlFor="precioIVA">Precio I.V.A.</label>
              </div>
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="precioIVAINC"
                name="precioIVAINC"
                value={newStock.precioIVAINC}
                onChange={handleChange}
              />
              <label htmlFor="precioIVAINC">Precio de venta</label>
            </div>
          </div>
          {tipoImpositivo === TipoImpositivo.recargo ? (
            <div>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="precioIVAINC"
                  name="precioIVAINC"
                  value={newStock.precioIVAINC}
                  onChange={handleChange}
                />
                <label htmlFor="precioIVAINC">Recargo</label>
              </div>
              <div className="form-floating">
                <input
                  className="form-control"
                  id="precioIVAINC"
                  name="precioIVAINC"
                  value={newStock.precioIVAINC}
                  onChange={handleChange}
                />
                <label htmlFor="precioIVAINC">Total</label>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
