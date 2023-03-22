import { Product, Stock } from "../../../../../interfaces";

import style from "./Details.module.css";

interface Props {
  product: Product | undefined;
  stock: Stock | undefined;
  handleClose: (stock: Stock | null) => void;
}

export default function Details({ product, stock, handleClose }: Props) {
  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.btnClose}>
          <h4>Detalles del item</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleClose(null)}
          >
            x
          </button>
        </div>
        <div className={style.data}>
          <div className={style.product}>
            <div className={style.dataContainer}>
              <span className={style.title}>Modelo:</span>
              <span>{product?.modelo}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Marca:</span>
              <span>{product?.marca}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Color:</span>
              <span>{product?.color}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Capacidad:</span>
              <span>{product?.capacidad}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Descripcion larga:</span>
              <span>{product?.descLarga}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Descripcion corta:</span>
              <span>{product?.descCorta}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Familia:</span>
              <span>{product?.categoria}</span>
            </div>

          </div>
          <div className={style.stock}>
            <div className={style.dataContainer}>
              <span className={style.title}>Estado:</span>
              <span>{stock?.status}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>IMEI / Serie:</span>
              <span>{stock?.IMEISerie}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Codigo De Barras:</span>
              <span>{stock?.codigoDeBarras}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Precio:</span>
              <span>{stock?.precioSinIVA}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Precio IVA:</span>
              <span>{stock?.precioIVA}</span>
            </div>

            <div className={style.dataContainer}>
              <span className={style.title}>Precio IVA INC:</span>
              <span>{stock?.precioIVAINC}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
