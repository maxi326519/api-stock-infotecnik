import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../../../../redux/actions/products";
import { Product, RootState } from "../../../../../interfaces";
import swal from "sweetalert";
import {
  postCapacidades,
  postColores,
} from "../../../../../redux/actions/products";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

import AddImages from "./AddImages/AddImages";
import CategoriesTree from "../CategoriesTree/CategoriesTree";
import Capacidades from "../Capacidades/Capacidades";
import Colores from "../Colores/Colores";

import style from "./Form.module.css";
import axios from "axios";

interface Props {
  handleForm: () => void;
}

export default function Form({ handleForm }: Props) {
  const initialState: Product = {
    id: "",
    codigo: "",
    modelo: "",
    marca: "",
    color: "",
    capacidad: "",
    descLarga: "",
    descCorta: "",
    CategoryId: "",
    Images: [],
  };
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );
  const [capacidadesForm, setCapacidadesForm] = useState(false);
  const [coloresForm, setColoresForm] = useState(false);
  const [product, setProduct] = useState(initialState);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [categoriesForm, setCategoriesForm] = useState<boolean>(false);
  const [error, setError] = useState({
    codigo: "",
    modelo: "",
    marca: "",
    color: "",
    capacidad: "",
    descCorta: "",
    descLarga: "",
    categoria: "",
  });
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (handleValidations()) {
      let imagesUrl: string[] = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("file", imageFiles[i]);

        try {
          const response = await axios.post("/upload/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          imagesUrl.push(response.data.path);
        } catch (error) {
          console.error(error);
        }
      }

      const newProduct = {
        ...product,
        Images: imagesUrl,
      };

      dispatch(loading());
      dispatch<any>(postProduct(newProduct))
        .then(() => {
          handleClose();
          dispatch(closeLoading());
          swal("Guardado", "Su producto se guardo correctamente", "success");
        })
        .catch((err: any) => {
          console.log(err);
          dispatch(closeLoading());
          swal("Error", "Hubo un error al guardar el nuevo producto", "error");
        });
    }
  }

  function handleValidations() {
    let newErrors = { ...error };
    let validation: boolean = true;

    if (product.codigo === "") {
      newErrors.codigo = "Debes agregar un codigo";
      validation = false;
    }
    if (product.modelo === "") {
      newErrors.modelo = "Debes agregar un modelo";
      validation = false;
    }
    if (product.marca === "") {
      newErrors.marca = "Debes agregar una marca";
      validation = false;
    }
    if (product.color === "0") {
      newErrors.color = "Debes agregar un color";
      validation = false;
    }
    if (product.capacidad === "0") {
      newErrors.capacidad = "Debes agregar una capacidad";
      validation = false;
    }
    if (product.CategoryId === "") {
      newErrors.categoria = "Debes agregar una categoria";
      validation = false;
    }
    setError(newErrors);
    return validation;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    console.log(event.target.name);
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleChangeSelect(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleChangeTextArea(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleSelectedCategories(selected: string) {
    setProduct({ ...product, CategoryId: selected });
    setError({ ...error, categoria: "" });
  }

  function handleClose(): void {
    handleForm();
    setProduct(initialState);
  }

  function handleCloseCategories(): void {
    setCategoriesForm(!categoriesForm);
  }

  function handleSubmitCapacidades(data: string[]) {
    dispatch<any>(postCapacidades(data));
  }

  function handleSubmitColores(data: string[]) {
    dispatch<any>(postColores(data));
  }

  function handleCapacidadesForm() {
    setCapacidadesForm(!capacidadesForm);
  }

  function handleColoresForm() {
    setColoresForm(!coloresForm);
  }

  return (
    <div className={style.container}>
      {categoriesForm ? (
        <CategoriesTree
          categories={categories}
          handleSelected={handleSelectedCategories}
          handleClose={handleCloseCategories}
        />
      ) : null}
      {capacidadesForm ? (
        <Capacidades
          data={capacidades}
          handleClose={handleCapacidadesForm}
          handleSubmit={handleSubmitCapacidades}
        />
      ) : null}
      {coloresForm ? (
        <Colores
          data={colores}
          handleClose={handleColoresForm}
          handleSubmit={handleSubmitColores}
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Nuevo producto</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.flex}>
          <div className={style.inputs}>
            <div className="form-floating">
              <input
                id={!error.codigo ? "floatingInputInvalid" : "codigo"}
                className={`form-control ${!error.codigo ? "" : "is-invalid"}`}
                name="codigo"
                type="text"
                placeholder="codigo"
                value={product.codigo}
                onChange={handleChange}
              />
              <label htmlFor="codigo">Codigo</label>
              <small>{error.codigo}</small>
            </div>

            <div className="form-floating">
              <input
                id={!error.modelo ? "floatingInputInvalid" : "modelo"}
                className={`form-control ${!error.modelo ? "" : "is-invalid"}`}
                name="modelo"
                type="text"
                placeholder="modelo"
                value={product.modelo}
                onChange={handleChange}
              />
              <label htmlFor="modelo">Modelo</label>
              <small>{error.modelo}</small>
            </div>

            <div className="form-floating">
              <input
                id={!error.marca ? "floatingInputInvalid" : "marca"}
                className={`form-control ${!error.marca ? "" : "is-invalid"}`}
                name="marca"
                type="text"
                placeholder="marca"
                value={product.marca}
                onChange={handleChange}
              />
              <label htmlFor="marca">Marca</label>
              <small>{error.marca}</small>
            </div>

            <div className="form-floating">
              <select
                id={!error.color ? "floatingInputInvalid" : "color"}
                className={`form-control ${!error.color ? "" : "is-invalid"}`}
                name="color"
                placeholder="color"
                value={product.color}
                onChange={handleChangeSelect}
              >
                <option value="">Seleccionar color</option>
                {colores.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              <label htmlFor="color">Colores</label>
              <small>{error.color}</small>
            </div>

            <div className="form-floating">
              <select
                id={!error.capacidad ? "floatingInputInvalid" : "capacidad"}
                className={`form-control ${
                  !error.capacidad ? "" : "is-invalid"
                }`}
                name="capacidad"
                placeholder="capacidad"
                value={product.capacidad}
                onChange={handleChangeSelect}
              >
                <option value="">Seleccionar capacidad</option>
                {capacidades.map((cap, i) => (
                  <option key={i} value={cap}>
                    {cap}
                  </option>
                ))}
              </select>
              <label htmlFor="capacidad">Capacidad</label>
              <small>{error.capacidad}</small>
            </div>

            <div className="form-floating">
              <input
                id={error.descCorta ? "floatingInputInvalid" : "descCorta"}
                className={`form-control ${
                  !error.descCorta ? "" : "is-invalid"
                }`}
                name="descCorta"
                placeholder="descCorta"
                type="text"
                value={product.descCorta}
                onChange={handleChange}
              />
              <label htmlFor="descCorta">Desc Corta</label>
              <small>{error.descCorta}</small>
            </div>

            <div className="form-floating">
              <textarea
                id={error.descLarga ? "floatingInputInvalid" : "descLarga"}
                className={`form-control ${
                  !error.descLarga ? "" : "is-invalid"
                }`}
                name="descLarga"
                placeholder="descLarga"
                value={product.descLarga}
                onChange={handleChangeTextArea}
              />
              <label htmlFor="descLarga">Desc Larga</label>
              <small>{error.descLarga}</small>
            </div>

            <div
              className={`${style.categoria} ${
                !error.categoria ? "" : style.categoriaError
              }`}
            >
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleCloseCategories}
              >
                Agregar
              </button>
              <label htmlFor="categoria">
                {categories.find((cat) => cat[0] === product.CategoryId)?.[1]}
              </label>
              <small>{error.categoria}</small>
            </div>
          </div>
          <AddImages
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />
        </div>
        <div className={style.buttons}>
          <button className="btn btn-success" type="submit">
            Crear producto
          </button>
          <div className={style.buttonsForm}>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleCapacidadesForm}
            >
              Capacidades
            </button>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleColoresForm}
            >
              Colores
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
