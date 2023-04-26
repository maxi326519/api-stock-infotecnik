import { useEffect, useState } from "react";
import { Product, RootState } from "../../../../../interfaces";
import swal from "sweetalert";

import style from "./Details.module.css";
import ImageEditor from "./ImageEditor/ImageEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../../../../redux/actions/products";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import CategoriesTree from "../CategoriesTree/CategoriesTree";

const initialErrors = {
  codigo: "",
  modelo: "",
  marca: "",
  color: "",
  capacidad: "",
  descCorta: "",
  descLarga: "",
  CategoryId: "",
};

interface Props {
  product: Product;
  handleDetails: () => void;
}

export default function Details({ product, handleDetails }: Props) {
  const dispatch = useDispatch();
  const capacidades = useSelector(
    (state: RootState) => state.attributes.capacidades
  );
  const colores = useSelector((state: RootState) => state.attributes.colores);
  const categories = useSelector(
    (state: RootState) => state.attributes.categories
  );
  const [localProduct, setLocalProduct] = useState<Product>(product);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [imageUrls, setImageUrls] = useState<string[]>(product?.Images);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [categoriesForm, setCategoriesForm] = useState<boolean>(false);
  const [error, setError] = useState(initialErrors);

  useEffect(() => {
    setLocalProduct(product);
    setImageUrls(product?.Images);
  }, [product]);

  function handleDisabled(): void {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const editProduct: Product = {
      ...localProduct,
      [event.target.name]: event.target.value,
    };
    setLocalProduct(editProduct);
    setError({ ...error, [event.target.name]: "" });
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const editProduct: Product = {
      ...localProduct,
      [event.target.name]: event.target.value,
    };
    setLocalProduct(editProduct);
    setError({ ...error, [event.target.name]: "" });
  }

  function handleSave() {
    if (handleValidations()) {
      swal({
        text: "¿Quiere guardar los cambios?",
        buttons: {
          si: true,
          cancel: true,
        },
      }).then((res) => {
        if (res) {
          dispatch(loading());
          dispatch<any>(updateProduct(localProduct))
            .then(() => {
              handleDisabled();
              dispatch(closeLoading());
              swal("Actualizado", "Producto actualizado con exito", "success");
            })
            .catch((err: any) => {
              console.log(err);
              dispatch(closeLoading());
              swal(
                "Error",
                "Hubo un error al intentar actualizar el producto, intentelo mas tarde",
                "error"
              );
            });
        }
      });
    }
  }

  function handleCancel() {
    swal({
      text: "¿Seguro que no desea guardar los cambios?",
      buttons: {
        si: true,
        cancel: true,
      },
    }).then(() => {
      handleDisabled();
      setError(initialErrors);
      setLocalProduct(product);
    });
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
    }).then((res) => {
      if (res) {
        dispatch<any>(deleteProduct(product?.id))
          .then(() => {
            handleDetails();
            swal("Eliminado", "Se elimino el producto con exito", "success");
          })
          .catch(() => {
            swal(
              "Error",
              "Hubo un error al intentar eliminar el peducto, intentalo mas tarde",
              "Error"
            );
          });
      }
    });
  }

  function handleValidations() {
    let newErrors = { ...error };
    let validation: boolean = true;

    if (localProduct.codigo === "") {
      newErrors.codigo = "Debes agregar un codigo";
      validation = false;
    }
    if (localProduct.modelo === "") {
      newErrors.modelo = "Debes agregar un modelo";
      validation = false;
    }
    if (localProduct.marca === "") {
      newErrors.marca = "Debes agregar una marca";
      validation = false;
    }
    if (localProduct.color === "0") {
      newErrors.color = "Debes agregar un color";
      validation = false;
    }
    if (localProduct.capacidad === "0") {
      newErrors.capacidad = "Debes agregar una capacidad";
      validation = false;
    }
    setError(newErrors);
    return validation;
  }

  function handleSelectedCategories(selected: string) {
    setLocalProduct({ ...product, CategoryId: selected });
  }

  function handleCloseCategories(): void {
    setCategoriesForm(!categoriesForm);
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
      <div className={style.details}>
        <div className={style.close}>
          <h4>Detalles del producto</h4>
          <div className="btn-close" onClick={handleDetails} />
        </div>
        <div className={style.data}>
          <div className={style.inputs}>
            <div className="form-floating mb-3">
              <input
                id={"codigo"}
                className={`form-control ${!error.codigo ? "" : "is-invalid"}`}
                name="codigo"
                type="text"
                value={localProduct?.codigo}
                placeholder="codigo"
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor={!error.codigo ? "floatingInputInvalid" : "codigo"}>Codigo</label>
              <small>{error.codigo}</small>
            </div>

            <div className="form-floating mb-3">
              <input
                id={!error.modelo ? "floatingInputInvalid" : "modelo"}
                className={`form-control ${!error.modelo ? "" : "is-invalid"}`}
                name="modelo"
                type="text"
                value={localProduct?.modelo}
                placeholder="modelo"
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="modelo">Modelo</label>
              <small>{error.modelo}</small>
            </div>

            <div className="form-floating mb-3">
              <input
                id={!error.marca ? "floatingInputInvalid" : "marca"}
                className={`form-control ${!error.marca ? "" : "is-invalid"}`}
                name="marca"
                type="text"
                value={localProduct?.marca}
                placeholder="marca"
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="marca">Marca</label>
              <small>{error.marca}</small>
            </div>

            <div className="form-floating mb-3">
              <select
                id={error.color ? "floatingInputInvalid" : "color"}
                className={`form-control ${!error.color ? "" : "is-invalid"}`}
                name="color"
                value={localProduct?.color}
                placeholder="color"
                onChange={handleSelectChange}
                disabled={isDisabled}
              >
                <option value="0">Seleccionar color</option>
                {colores.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              <label htmlFor="color">Color</label>
              <small>{error.color}</small>
            </div>

            <div className="form-floating mb-3">
              <select
                id={error.capacidad ? "floatingInputInvalid" : "capacidad"}
                className={`form-control ${
                  !error.capacidad ? "" : "is-invalid"
                }`}
                name="capacidad"
                value={localProduct?.capacidad}
                placeholder="capacidad"
                onChange={handleSelectChange}
                disabled={isDisabled}
              >
                <option value="0">Seleccionar capacidad</option>
                {capacidades.map((cap, i) => (
                  <option key={i} value={cap}>
                    {cap}
                  </option>
                ))}
              </select>
              <label
                htmlFor={error.capacidad ? "floatingInputInvalid" : "capacidad"}
              >
                Capacidad
              </label>
              <small>{error.capacidad}</small>
            </div>

            <div className="form-floating mb-3">
              <input
                id={error.descCorta ? "floatingInputInvalid" : "descCorta"}
                className={`form-control ${
                  !error.descCorta ? "" : "is-invalid"
                }`}
                name="descCorta"
                type="text"
                value={localProduct?.descCorta}
                placeholder="descCorta"
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="descCorta">Descripcion corta</label>
              <small>{error.descCorta}</small>
            </div>

            <div className="form-floating mb-3">
              <input
                id={error.descLarga ? "floatingInputInvalid" : "descLarga"}
                className={`form-control ${
                  !error.descLarga ? "" : "is-invalid"
                }`}
                name="descLarga"
                type="text"
                value={localProduct?.descLarga}
                placeholder="descLarga"
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="descLarga">Descripcion larga</label>
              <small>{error.descLarga}</small>
            </div>

            {isDisabled ? (
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="categoria"
                  type="text"
                  value={localProduct?.CategoryId}
                  placeholder="categoria"
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <label htmlFor="categoria">Categoria</label>
              </div>
            ) : (
              <div
                className={`${style.categoria} ${
                  !error.CategoryId ? "" : style.categoriaError
                }`}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleCloseCategories}
                >
                  Cambiar
                </button>
                <label htmlFor="categoria">{localProduct.CategoryId}</label>
                <small>{error.CategoryId}</small>
              </div>
            )}
          </div>
          <div className={style.rightData}>
            <ImageEditor
              isDisabled={isDisabled}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          </div>
        </div>
        <div className={style.btnContainer}>
          {isDisabled ? (
            <div className={style.leftButtons}>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleDisabled}
              >
                Editar
              </button>
            </div>
          ) : (
            <div className={style.leftButtons}>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          )}
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleRemove}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
