import { useEffect, useState } from "react";
import { Stock } from "../../../../../../interfaces";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./AddImages.module.css";

interface Props {
  imagesList: string[];
  handleSetImage: (url: string[]) => void;
}

export default function AddImages({
  imagesList,
  handleSetImage,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => {
    if (imagesList.length === 0) {
      setSelectedImage(img);
    } else if (imagesList.length === 1) {
      setSelectedImage(imagesList[0]);
    }
  }, [imagesList]);

  useEffect(() => {
    handleSetImage(imagesList);
  }, []);

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) handleSetImage([...imagesList, URL.createObjectURL(file)]);
  }

  return (
    <div className={styles.form}>
      <div>
        <div className={styles.imageContainer}>
          <img className={styles.icon} src={selectedImage} alt="img" />
        </div>
        <div className="mb-3 form-floating">
          <label className="form-control" htmlFor="images">
            Agregar otra imagen
          </label>
          <input
            className="form-control"
            id="images"
            type="file"
            onChange={handleImage}
          />
        </div>
      </div>
      <div className={styles.imgList}>
        {imagesList.map((url) => (
          <div className={styles.image} onClick={() => setSelectedImage(url)}>
            <img src={url} alt="product" />
          </div>
        ))}
      </div>
    </div>
  );
}
