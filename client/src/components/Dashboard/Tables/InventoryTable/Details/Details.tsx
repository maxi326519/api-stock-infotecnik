import { useEffect, useState } from "react";
import { Invoices, Product, Stock } from "../../../../../interfaces";

import style from "./Details.module.css";
import ImageEditor from "./ImageEditor/ImageEditor";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import {
  deleteStock,
  updateStock,
} from "../../../../../redux/actions/inventory";

interface Props {
  product: Product | undefined;
  stock: Stock | undefined;
  invoice: Invoices | undefined;
  handleClose: (stock: Stock | null) => void;
}

export default function Details({
  product,
  stock,
  invoice,
  handleClose,
}: Props) {
  const dispatch = useDispatch();
  const [images, setImages] = useState<string[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [editStock, setEditStock] = useState<any>();

  useEffect(() => {
    if (stock) setEditStock(stock);
  }, [stock]);

  useEffect(() => {
    let imagesUrl: string[] = [];

    console.log(product?.Images);
    console.log(stock?.Images);

    if (product) {
      imagesUrl = product.Images;
    }
    if (stock) {
      imagesUrl = [...imagesUrl, ...stock.Images];
    }

    console.log(imagesUrl);

    setImages(imagesUrl);
  }, [product, stock]);

  function handleDisabled(): void {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newStock = {
      ...editStock,
      [event.target.name]: event.target.value,
    };
    setEditStock(newStock);
  }

  function handleSave() {
    if (stock) {
      swal({
        text: "¿Quiere guardar los cambios?",
        buttons: {
          si: true,
          cancel: true,
        },
      }).then((res) => {
        if (res) {
          dispatch(loading());
          dispatch<any>(updateStock(editStock))
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
      setEditStock(stock);
    });
  }

  function handleRemove(): void {
    if (stock) {
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
          dispatch<any>(deleteStock(stock?.id))
            .then(() => {
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
  }

  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.btnClose}>
          <h4>Detalles del item</h4>
          <div className="btn-close" onClick={() => handleClose(null)} />
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
              <span>{product?.CategoryId}</span>
            </div>
          </div>
          <div className={style.stock}>
            <div className="form-floating">
              <input
                id="estado"
                name="estado"
                className="form-control"
                value={editStock?.estado}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="estado" className="form-label">
                Estado:
              </label>
            </div>

            {editStock?.IMEISerie ? (
              <div className="form-floating">
                <input
                  id="IMEISerie"
                  name="IMEISerie"
                  className="form-control"
                  value={editStock?.IMEISerie}
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <label htmlFor="IMEISerie" className="form-label">
                  IMEI / Serie:
                </label>
              </div>
            ) : null}

            {editStock?.codigoDeBarras ? (
              <div className="form-floating">
                <input
                  id="codigoDeBarras"
                  name="codigoDeBarras"
                  className="form-control"
                  value={editStock?.codigoDeBarras}
                  onChange={handleChange}
                  disabled={isDisabled}
                />
                <label htmlFor="codigoDeBarras" className="form-label">
                  Codigo De Barras:
                </label>
              </div>
            ) : null}

            <div className="form-floating">
              <input
                id="cantidad"
                name="cantidad"
                className="form-control"
                value={editStock?.cantidad}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="cantidad" className="form-label">
                Cantidad:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="catalogo"
                name="catalogo"
                className="form-control"
                value={`${editStock?.catalogo}`}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="catalogo" className="form-label">
                Catalogo:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="precioSinIVA"
                name="precioSinIVA"
                className="form-control"
                value={editStock?.precioSinIVA}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="precioSinIVA" className="form-label">
                Precio:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="precioIVA"
                name="precioIVA"
                className="form-control"
                value={editStock?.precioIVA}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="precioIVA" className="form-label">
                Precio IVA:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="precioIVAINC"
                name="precioIVAINC"
                className="form-control"
                value={editStock?.precioIVAINC}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="precioIVAINC" className="form-label">
                Precio de venta:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="recargo"
                name="recargo"
                className="form-control"
                value={editStock?.recargo}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="recargo" className="form-label">
                Recargo:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="total"
                name="total"
                className="form-control"
                value={editStock?.total}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="total" className="form-label">
                Total:
              </label>
            </div>

            <div className="form-floating">
              <input
                id="detalles"
                name="detalles"
                className="form-control"
                value={editStock?.detalles}
                onChange={handleChange}
                disabled={isDisabled}
              />
              <label htmlFor="detalles" className="form-label">
                Detalles:
              </label>
            </div>
          </div>
          <ImageEditor imageUrls={images} />
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
            className="btn btn-danger"
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
