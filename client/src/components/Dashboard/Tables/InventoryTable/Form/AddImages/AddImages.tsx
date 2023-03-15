import { useState } from "react";
import { Stock } from "../../../../../../interfaces";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./AddImages.module.css";

interface Props {
  handleClose: () => void;
  newStock: Stock;
  setStock: (stock: Stock) => void;
}

export default function AddImages({ handleClose, newStock, setStock }: Props) {
  const [image, setImage] = useState<string[]>([]);

  function handleSaveImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImage([...image, URL.createObjectURL(file)]);
  }

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
          <img className={styles.icon} src={img} alt="img" />
          <div className="mb-3 form-floating">
            <label className="form-control" htmlFor="images">Agregar otra imagen</label>
            <input className="form-control" id="images" type="file" onChange={handleSaveImage} />
          </div>
        </div>
        <div className={styles.imgList}>
          {image.map((url) => (
            <div className={styles.image}>
              <img src={url} alt="product" />
            </div>
          ))}
        </div>
        <button className="btn btn-success" type="button">
          Guardar
        </button>
      </form>
    </div>
  );
}
