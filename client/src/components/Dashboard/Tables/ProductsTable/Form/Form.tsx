import { useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../../../../redux/actions/products";
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
    descLarga: "",
    descCorta: "",
    imgGenerica: [],
    categoria: "",
  };

  const [product, setProduct] = useState(initialState);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    try {
      dispatch<any>(postProduct(product));
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
              <input
                id="id"
                name="id"
                className="form-control"
                type="text"
                value={product.id}
                onChange={handleChange}
              />
              <label htmlFor="id">ID</label>
            </div>

            <div className="mb-3 form-floating">
              <input
                id="modelo"
                name="modelo"
                className="form-control"
                type="text"
                value={product.modelo}
                onChange={handleChange}
              />
              <label htmlFor="modelo">Modelo</label>
            </div>

            <div className="mb-3 form-floating">
              <input
                id="marca"
                name="marca"
                className="form-control"
                type="text"
                value={product.marca}
                onChange={handleChange}
              />
              <label htmlFor="marca">Marca</label>
            </div>
            <div className="mb-3 form-floating">
              <input
                id="color"
                name="color"
                className="form-control"
                type="text"
                value={product.color}
                onChange={handleChange}
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="mb-3 form-floating">
              <input
                id="capacidad"
                name="capacidad"
                className="form-control"
                type="text"
                value={product.capacidad}
                onChange={handleChange}
              />
              <label htmlFor="capacidad">Capacidad</label>
            </div>
          </div>
          <div className={style.right}>
            <div className="mb-3 form-floating">
              <textarea
                id="descLarga"
                name="descLarga"
                className={`form-control ${style.textArea}`}
                value={product.descLarga}
                onChange={handleChangeTextArea}
              />
              <label htmlFor="descLarga">Desc Larga</label>
            </div>
            <div className="mb-3 form-floating">
              <input
                id="descCorta"
                name="descCorta"
                className="form-control"
                type="text"
                value={product.descCorta}
                onChange={handleChange}
              />
              <label htmlFor="descCorta">Desc Corta</label>
            </div>
            <div className="mb-3 form-floating">
              <input
                id="familia"
                name="familia"
                className="form-control"
                type="text"
                value={product.categoria}
                onChange={handleChange}
              />
              <label htmlFor="familia">Familia</label>
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
