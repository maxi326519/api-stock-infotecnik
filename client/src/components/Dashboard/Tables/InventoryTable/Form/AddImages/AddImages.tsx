import img from "../../../../../assets/svg/image.svg";

import styles from "./AddImages.module.css";

interface Props {
  handleClose: () => void;
}

export default function AddImages({ handleClose }: Props) {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.close}>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div>
          <img src={img} alt="img" />
          <label htmlFor="images">Agregar otra imagen</label>
          <input id="images" type="file" />
        </div>
        <button className="btn btn-success" type="button">
          Guardar
        </button>
      </form>
    </div>
  );
}
