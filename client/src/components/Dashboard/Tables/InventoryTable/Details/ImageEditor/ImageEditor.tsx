import { useEffect, useState } from "react";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./ImageEditor.module.css";

interface Props {
  imageUrls: string[] | undefined;
}

export default function ImageEditor({
  imageUrls,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(img);

  // Set selected image
  useEffect(() => {
    if (imageUrls === undefined || imageUrls.length === 0) {
      setSelectedImage(img);
    } else {
      setSelectedImage(`${process.env.REACT_APP_API_URL || "https://api.infotecnik.cat"}/images/${imageUrls[0]}`);
    }
  }, [imageUrls]);
  
  function handleSelect(url: string) {
    setSelectedImage(`${process.env.REACT_APP_API_URL || "https://api.infotecnik.cat"}/images/${url}`);
  }

  return (
    <div className={styles.form}>
      <div className={styles.imageContainer}>
        <img
          className={styles.icon}
          src={selectedImage}
          alt="img"
        />
      </div>
      <div className={styles.imgList}>
        {imageUrls?.map((url) => (
          <div
            key={url}
            className={styles.image}
            onClick={() => handleSelect(url)}
          >
            <img src={`${process.env.REACT_APP_API_URL || "https://api.infotecnik.cat"}/images/${url}`} alt="product" />
          </div>
        ))}
      </div>
    </div>
  );
}
