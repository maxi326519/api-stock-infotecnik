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
          <button className="btn btn-danger" type="button" onClick={() => handleClose(null)}>
            x
          </button>
        </div>
        <div className={style.data}>
            <div className="form-floating">
              <input
                className="form-control"
                id="id"
                type="text"
                value={product?.id}
              />
              <label htmlFor="id">ID</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="modelo"
                type="text"
                value={product?.modelo}
              />
              <label htmlFor="modelo">Modelo</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="marca"
                type="text"
                value={product?.marca}
              />
              <label htmlFor="marca">Marca</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="color"
                type="text"
                value={product?.color}
              />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="capacidad"
                type="text"
                value={product?.capacidad}
              />
              <label htmlFor="capacidad">Capacidad</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="descripcionLarga"
                type="text"
                value={product?.descLarga}
              />
              <label htmlFor="descripcionLarga">Descripcion larga</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="descripcionCorta"
                type="text"
                value={product?.descCorta}
              />
              <label htmlFor="descripcionCorta">Descripcion corta</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="categoria"
                type="text"
                value={product?.categoria}
              />
              <label htmlFor="categoria">Familia</label>
          </div>
        </div>
      </div>
    </div>
  );
}
