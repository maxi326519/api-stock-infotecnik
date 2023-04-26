import { useEffect, useState } from "react";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./AddImages.module.css";

interface Props {
  imageUrls: string[];
  setImageUrls: (imageUrl: string[]) => void;
  imageFiles: File[];
  setImageFiles: (image: File[]) => void;
}

export default function AddImages({
  imageUrls,
  setImageUrls,
  imageFiles,
  setImageFiles,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(img);

  // Set selected image
  useEffect(() => {
    if (imageUrls.length === 0) {
      setSelectedImage(img);
    } else {
      setSelectedImage(imageUrls[0]);
    }
  }, [imageUrls]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageFiles([...imageFiles, file]);
      const url = URL.createObjectURL(file);

      if (!imageUrls.some((image) => image === url)) {
        setImageUrls([...imageUrls, URL.createObjectURL(file)]);
      } else {
        setSelectedImage(url);
      }
    }
  }

  function handleSelect(url: string) {
    setSelectedImage(url);
  }

  function handleRemove() {
    setImageUrls(imageUrls.filter((url: string) => url !== selectedImage));
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.imageContainer}>
          {imageUrls.length > 0 ? (
            <div
              className={`btn-close ${styles.delete}`}
              onClick={handleRemove}
            />
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
        {imageUrls.length > 0 ? (
          imageUrls.map((url) => (
            <div
              key={url}
              className={styles.image}
              onClick={() => handleSelect(url)}
            >
              <img src={url} alt="product" />
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <span>Vacío</span>
          </div>
        )}
      </div>
    </div>
  );
}
