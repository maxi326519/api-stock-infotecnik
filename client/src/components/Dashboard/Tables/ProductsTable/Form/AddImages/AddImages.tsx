import { useEffect, useState } from "react";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./AddImages.module.css";

interface Props {
  imageUrls: string[];
  handleSetImage: (files: File[], urls: string[]) => void;
}

export default function AddImages({ imageUrls, handleSetImage }: Props) {
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(img);

  // Load images
  useEffect(() => {
    setLocalImageUrls([...localImageUrls, ...imageUrls]);
  }, [imageUrls]);

  // Set selected image
  useEffect(() => {
    if (localImageUrls.length === 0) {
      setSelectedImage(img);
    } else {
      setSelectedImage(localImageUrls[0]);
    }
  }, [localImageUrls]);

  function handleSubmitFile() {
    handleSetImage(localFiles, localImageUrls);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setLocalFiles([...localFiles, file]);
      const url = URL.createObjectURL(file);

      if (!localImageUrls.some((image) => image === url)) {
        setLocalImageUrls([...localImageUrls, URL.createObjectURL(file)]);
      } else {
        setSelectedImage(url);
      }
    }
  }

  function handleSelect(url: string) {
    setSelectedImage(url);
  }

  function handleRemove() {
    setLocalImageUrls(
      localImageUrls.filter((url: string) => url !== selectedImage)
    );
  }

  return (
    <div className={styles.form}>
      <div>
        <div className={styles.imageContainer}>
          {localImageUrls.length > 0 ? (
            <button
              className={`btn btn-outline-danger ${styles.delete}`}
              type="button"
              onClick={handleRemove}
            >
              X
            </button>
          ) : null}
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
        {localImageUrls.map((url) => (
          <div
            key={url}
            className={styles.image}
            onClick={() => handleSelect(url)}
          >
            <img src={url} alt="product" />
          </div>
        ))}
      </div>
    </div>
  );
}
