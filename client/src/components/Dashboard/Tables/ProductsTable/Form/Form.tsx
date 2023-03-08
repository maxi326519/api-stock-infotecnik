import { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../../../../redux/actions";
import { Product } from "../../../../../interfaces";
import swal from "sweetalert";

import style from "./Form.module.css";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: Product = {
    id: "",
    modelo: "",
    marca: "",
    color: "",
    capacidad: "",
    descripcionLarga: "",
    descripcionCorta: "",
    imgGenerica: [],
    categoria: "",
  };

  const [product, setProduct] = useState(initialState);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    try {
      dispatch(postProduct(product));
      handleClose();
      swal("Guardado", "Su producto se guardo correctamente", "success");
    } catch (err) {
      swal("Error", "Hubo un error al guardar el nuevo producto", "error");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleChangeTextArea(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleClose(): void {
    handleForm();
    setProduct(initialState);
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar productos</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.inputs}>
          <div className={style.left}>
            <div className="mb-3 form-floating">
              <label htmlFor="id">ID</label>
              <input
                id="id"
                name="id"
                className="form-control"
                type="text"
                value={product.id}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 form-floating">
              <label htmlFor="modelo">Modelo</label>
              <input
                id="modelo"
                name="modelo"
                className="form-control"
                type="text"
                value={product.modelo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 form-floating">
              <label htmlFor="marca">Marca</label>
              <input
                id="marca"
                name="marca"
                className="form-control"
                type="text"
                value={product.marca}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-floating">
              <label htmlFor="color">Color</label>
              <input
                id="color"
                name="color"
                className="form-control"
                type="text"
                value={product.color}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-floating">
              <label htmlFor="capacidad">Capacidad</label>
              <input
                id="capacidad"
                name="capacidad"
                className="form-control"
                type="text"
                value={product.capacidad}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={style.right}>
            <div className="mb-3 form-floating">
              <label htmlFor="descripcionLarga">Desc Larga</label>
              <textarea
                id="descripcionLarga"
                name="descripcionLarga"
                className="form-area"
                value={product.descripcionLarga}
                onChange={handleChangeTextArea}
              />
            </div>
            <div className="mb-3 form-floating">
              <label htmlFor="descripcionCorta">Desc Corta</label>
              <input
                id="descripcionCorta"
                name="descripcionCorta"
                className="form-control"
                type="text"
                value={product.descripcionCorta}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-floating">
              <label htmlFor="familia">Familia</label>
              <input
                id="familia"
                name="familia"
                className="form-control"
                type="text"
                value={product.categoria}
                onChange={handleChange}
              />
            </div>
            <input
              id="imgGenerica"
              name="imgGenerica"
              className="form-control"
              placeholder="Archivo"
              type="file"
              value={product.imgGenerica}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
}
