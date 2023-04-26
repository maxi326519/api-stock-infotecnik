import { useState } from "react";
import { Supplier } from "../../../../../interfaces";

import style from "./SupplierRows.module.css";

import edit from "../../../../../assets/svg/edit.svg";
import save from "../../../../../assets/svg/save.svg";
import cancel from "../../../../../assets/svg/cancel.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import { useDispatch } from "react-redux";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";
import { deleteSuppllier, updateSuppllier } from "../../../../../redux/actions/suppliers";
import swal from "sweetalert";

interface Props {
  supplier: Supplier;
}

export default function SupplieRows({ supplier }: Props) {
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);
  const [localSupplier, setLocalSupplier] = useState(supplier);

  function handleDisabled() {
    setDisabled(!isDisabled);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setLocalSupplier({ ...supplier, [name]: value });
  }

  function handleUpdate() {
    swal({
      text: "¿Seguro que quiere actualizar el proveedor?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(updateSuppllier(localSupplier))
          .then(() => {
            swal("Actualizado", "Se actualizó el proveedor con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar actualizar el proveedor",
              "error"
            );
          });
      }
    });
  }


  function handleRemove() {
    swal({
      text: "Seguro que quiere eliminar el proveedor?",
      buttons: {
        confirm: true,
        cancel: true,
      },
    }).then((res) => {
      if (res) {
        dispatch(loading());
        dispatch<any>(deleteSuppllier(localSupplier.id))
          .then(() => {
            swal("Eliminado", "Se eliminó el proveedor con exito", "success");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Ocurrió un error al intentar eliminar el proveedor",
              "error"
            );
          });
      }
    });
  }

  return (
    <div className={style.row}>
      <input
        name="numero"
        className="form-control"
        value={localSupplier.numero}
        placeholder="Numero"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <input
        name="nombre"
        className="form-control"
        value={localSupplier.nombre}
        placeholder="Nombre"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <input
        name="direccion"
        className="form-control"
        value={localSupplier.direccion}
        placeholder="Direccion"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <input
        name="telefono"
        className="form-control"
        value={localSupplier.telefono}
        placeholder="Telefono"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <input
        name="poblacion"
        className="form-control"
        value={localSupplier.poblacion}
        placeholder="Poblacion"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <input
        name="postal"
        className="form-control"
        value={localSupplier.postal}
        placeholder="Postal"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <input
        name="cifNif"
        className="form-control"
        value={localSupplier.cifNif}
        placeholder="CIF NIF"
        onChange={handleChange}
        disabled={isDisabled}
      />
      {isDisabled ? <button
        className="btn btn-primary"
        type="button"
        onClick={handleDisabled}
      >
        <img src={edit} alt="edit" />
      </button>
        :
        <div className="btn-content">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleUpdate}
          >
            <img src={save} alt="edit" />
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleDisabled}
          >
            <img src={cancel} alt="edit" />
          </button>
        </div>
      }
      <button className="btn btn-danger" type="button" onClick={handleRemove}>
        <img src={deleteSvg} alt="delete" />
      </button>
    </div>
  );
}
