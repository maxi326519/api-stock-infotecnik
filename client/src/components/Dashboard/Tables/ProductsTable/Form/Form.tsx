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
    familia: "",
    imgGenerica: "",
    estado: "",
  };

  const [product, setProduct] = useState(initialState);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void{
    event.preventDefault();
    try{
      dispatch(postProduct(product));
      handleClose();
      swal("Guardado", "Su producto se guardo correctamente", "success");
    }catch(err){
      swal("Error", "Hubo un error al guardar el nuevo producto", "error");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleChangeTextArea(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  function handleClose(): void {
    handleForm();
    setProduct(initialState);
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div>
          <span onClick={handleClose}>X</span>
        </div>
        <h4>Agregar productos</h4>
        <div className={style.inputs}>
          <label htmlFor="id">ID</label>
          <input
            id="id"
            name="id"
            className=""
            type="text"
            value={product.id}
            onChange={handleChange}
          />

          <label htmlFor="modelo">Modelo</label>
          <input
            id="modelo"
            name="modelo"
            className=""
            type="text"
            value={product.modelo}
            onChange={handleChange}
          />

          <label htmlFor="marca">Marca</label>
          <input
            id="marca"
            name="marca"
            className=""
            type="text"
            value={product.marca}
            onChange={handleChange}
          />

          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            className=""
            type="text"
            value={product.color}
            onChange={handleChange}
          />

          <label htmlFor="capacidad">Capacidad</label>
          <input
            id="capacidad"
            name="capacidad"
            className=""
            type="text"
            value={product.capacidad}
            onChange={handleChange}
          />

          <label htmlFor="descripcionLarga">Desc Larga</label>
          <textarea
            id="descripcionLarga"
            name="descripcionLarga"
            className=""
            value={product.descripcionLarga}
            onChange={handleChangeTextArea}
          />

          <label htmlFor="descripcionCorta">Desc Corta</label>
          <input
            id="descripcionCorta"
            name="descripcionCorta"
            className=""
            type="text"
            value={product.descripcionCorta}
            onChange={handleChange}
          />

          <label htmlFor="familia">Familia</label>
          <input
            id="familia"
            name="familia"
            className=""
            type="text"
            value={product.familia}
            onChange={handleChange}
          />

          <label htmlFor="imgGenerica">Imagen</label>
          <input
            id="imgGenerica"
            name="imgGenerica"
            className=""
            type="file"
            value={product.imgGenerica}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
