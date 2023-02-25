import { useState } from "react";
import { Product } from "../../../../../interfaces";
import swal from "sweetalert";

import style from "./Details.module.css";

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function Details({ product, handleDetails }: Props) {
  const [isDisabled, setDisabled] = useState(true);

  function handleDisabled(): void {
    setDisabled(!isDisabled);
  }

  function handleRemove(): void {
    swal({
      title: "¡Atencion!",
      text: "¿Estas seguro que desea eliminar el producto? \n Recuerda que este cambio no se puede deshacer",
      icon: "warning",
      buttons: {
        eliminar: true,
        cancel: true,
      },
    });
  }

  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.btnClose}>
          <button className="btn btn-danger" onClick={handleDetails}>
            x
          </button>
        </div>

        <div className={style.data}>
          <div className={style.inputs}>
            <div className="form-floating">
              <input
                className="form-control"
                id="barCode"
                type="text"
                value={product.barCode}
                disabled={isDisabled}
              />
              <label htmlFor="barCode">Codigo de Barras</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="modelo"
                type="text"
                value={product.modelo}
                disabled={isDisabled}
              />
              <label htmlFor="modelo">Modelo</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="marca"
                type="text"
                value={product.marca}
                disabled={isDisabled}
              />
              <label htmlFor="marca">Marca</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="color"
                type="text"
                value={product.color}
                disabled={isDisabled}
              />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="capacidad"
                type="text"
                value={product.capacidad}
                disabled={isDisabled}
              />
              <label htmlFor="capacidad">Capacidad</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="descripcionLarga"
                type="text"
                value={product.descripcionLarga}
                disabled={isDisabled}
              />
              <label htmlFor="descripcionLarga">Descripcion larga</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="descripcionCorta"
                type="text"
                value={product.descripcionCorta}
                disabled={isDisabled}
              />
              <label htmlFor="descripcionCorta">Descripcion corta</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="estado"
                type="text"
                value={product.estado}
                disabled={isDisabled}
              />
              <label htmlFor="estado">Estado</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="familia"
                type="text"
                value={product.familia}
                disabled={isDisabled}
              />
              <label htmlFor="familia">Familia</label>
            </div>
          </div>
          <div className={style.rightData}>
            <div className={style.imgContainer}>
              <img
                src="https://images.samsung.com/es/smartphones/galaxy-z-fold4/images/galaxy-z-fold4_highlights_kv.jpg"
                alt="img generica"
              />
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                id="imgGenerica"
                type="file"
                value={product.imgGenerica}
                disabled={isDisabled}
              />
              <label htmlFor="imgGenerica">imagen</label>
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          {isDisabled ? (
            <button className="btn btn-success" onClick={handleDisabled}>
              Editar
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleDisabled}>
              Guardar
            </button>
          )}
          <button className="btn btn-success" onClick={handleDetails}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={handleRemove}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}