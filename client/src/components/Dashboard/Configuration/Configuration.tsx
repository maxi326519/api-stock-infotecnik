import { useDispatch, useSelector } from "react-redux";
import { Config, RootState } from "../../../interfaces";
import { useEffect, useState } from "react";
import { updateConfig } from "../../../redux/actions/configurations";
import { closeLoading, loading } from "../../../redux/actions/loading/loading";
import swal from "sweetalert";

import styles from "./Configuration.module.css";
import configSvg from "../../../assets/svg/menu/config.svg";

interface Props {
  handleClose: () => void;
}

export default function Configuration({ handleClose }: Props) {
  const dispatch = useDispatch();
  const config: Config = useSelector((state: RootState) => state.config);
  const [edit, setEdit] = useState<boolean>(false);
  const [editConfig, setEditConfig] = useState<Config>({
    ivaSuperReducido: 0,
    ivaReducido: 0,
    ivaGeneral: 0,
    recargo: 0,
  });

  useEffect(() => {
    setEditConfig(config);
  }, [config]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditConfig({ ...editConfig, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(loading());
    dispatch<any>(updateConfig(editConfig))
      .then(() => {
        dispatch(closeLoading());
        setEdit(!edit);
        swal(
          "Actualizado",
          "Se actualizó correctamente la configuración",
          "success"
        );
      })
      .catch((err: any) => {
        console.log(err);
        swal(
          "Error",
          "Ocurrió un error al actualizar la configuración, inténtelo más tarde",
          "error"
        );
      });
  }

  function handleEdit() {
    setEdit(!edit);
  }

  function handleCancel() {
    setEditConfig(config);
    setEdit(!edit);
  }

  return (
    <div className={styles.background}>
      <form className={`toTop ${styles.container}`} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <img src={configSvg} alt="config" />
          <h5>Configuracion</h5>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div>
          <div className="form-floating mb-3">
            <input
              id="ivaSuperReducido"
              name="ivaSuperReducido"
              value={editConfig.ivaSuperReducido}
              type="number"
              className="form-control"
              onChange={handleChange}
              disabled={!edit}
            />
            <label htmlFor="ivaSuperReducido">I.V.A Super reducido:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="ivaReducido"
              name="ivaReducido"
              value={editConfig.ivaReducido}
              type="number"
              className="form-control"
              onChange={handleChange}
              disabled={!edit}
            />
            <label htmlFor="ivaReducido">I.V.A Reducido:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="ivaGeneral"
              name="ivaGeneral"
              value={editConfig.ivaGeneral}
              type="number"
              className="form-control"
              onChange={handleChange}
              disabled={!edit}
            />
            <label htmlFor="ivaGeneral">I.V.A General:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="recargo"
              name="recargo"
              value={editConfig.recargo}
              type="number"
              className="form-control"
              onChange={handleChange}
              disabled={!edit}
            />
            <label htmlFor="recargo">Recargo:</label>
          </div>
        </div>
        {edit ? (
          <div className={styles.bntContainer}>
            <button className="btn btn-success" type="submit">
              Guardar
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="btn btn-success"
            type="button"
            onClick={handleEdit}
          >
            Editar
          </button>
        )}
      </form>
    </div>
  );
}
