
import style from "./Temporal.module.css";

interface Props {
  handleClose: () => void;
}

export default function Temporal({ handleClose }: Props) {

  function handleSubmit(){

  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar inventario</h4>
          <button className="btn btn-danger" type="button" onClick={handleClose}>
            X
          </button>
        </div>
        <div className={style.data}>

        </div>
      </form>
    </div>
  );
}
