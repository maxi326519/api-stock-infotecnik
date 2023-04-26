import { useEffect, useState } from "react";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./AddImages.module.css";

interface Props {
  handleClose: () => void;
  handleSubmit: (urls: string[], files: File[]) => void;
  imageUrls: string[] | undefined;
  imageFiles: File[] | undefined;
}

export default function ImageEditor({
  handleClose,
  handleSubmit,
  imageUrls,
  imageFiles,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(img);

  const [localImageUrls, setImageUrls] = useState<string[]>([]);
  const [localImageFiles, setImageFiles] = useState<File[]>([]);

  // Set selected image
  useEffect(() => {
    if (localImageUrls.length === 0) {
      setSelectedImage(img);
    } else {
      setSelectedImage(localImageUrls[0]);
    }
  }, [localImageUrls]);

  useEffect(() => {
    if (imageUrls && imageFiles) {
      setImageUrls(imageUrls);
      setImageFiles(imageFiles);
    }
  }, [imageUrls, imageFiles]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageFiles([...localImageFiles, file]);
      const url = URL.createObjectURL(file);

      if (!localImageUrls.some((image) => image === url)) {
        setImageUrls([...localImageUrls, URL.createObjectURL(file)]);
      } else {
        setSelectedImage(url);
      }
    }
  }

  function handleSave() {
    handleSubmit(localImageUrls, localImageFiles);
    handleClose();
  }

  function handleCancel() {
    handleClose();
  }

  function handleSelect(url: string) {
    setSelectedImage(url);
  }

  function handleRemove() {
    setImageUrls(localImageUrls.filter((url: string) => url !== selectedImage));
  }

  return (
    <div className={styles.container}>
      <div className={`toTop ${styles.form}`}>
        <div>
          <div className={styles.close}>
            <h4>Seleccione imagenes</h4>
            <div className="btn-close" onClick={handleClose} />
          </div>
          <div className={styles.imageContainer}>
            <div
              className={`btn-close ${styles.delete}`}
              onClick={handleRemove}
            />
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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.imgList}>
          {localImageUrls.map((url: string) => (
            <div
              key={url}
              className={styles.image}
              onClick={() => handleSelect(url)}
            >
              <img src={url} alt="product" />
            </div>
          ))}
        </div>
        <div className={styles.btnContainer}>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSave}
          >
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
      </div>
    </div>
  );
}
