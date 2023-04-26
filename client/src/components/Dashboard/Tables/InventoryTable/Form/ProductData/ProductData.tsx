import { Stock, TipoImpositivo } from "../../../../../../interfaces";

import Row from "./Row/Row";

import styles from "./ProductData.module.css";

interface ImagesData {
  stockId: string;
  imageUrls: string[];
  imageFiles: File[];
}

interface StockError {
  id: string;
  codigoDeBarras: string;
  IMEISerie: string;
  cantidad: string;
}

interface Props {
  stock: Stock[];
  stockError: StockError[];
  images: ImagesData[];
  handleSaveImages: (
    stockId: string,
    imageUrls: string[],
    imageFiles: File[]
  ) => void;
  tipoImpositivo: TipoImpositivo;
  handleChange: (
    productId: string,
    name: string,
    value: string | number | boolean
  ) => void;
  handleDuplicate: (stock: Stock) => void;
  handleRemove: (stockId: string) => void;
  handleFormProduct: () => void;
}

export default function ProductData({
  stock,
  stockError,
  images,
  handleSaveImages,
  tipoImpositivo,
  handleChange,
  handleDuplicate,
  handleRemove,
  handleFormProduct,
}: Props) {
  return (
    <div className={styles.productAdd}>
      <div className={styles.header}>
        <h5>Productos</h5>
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handleFormProduct}
        >
          Agregar
        </button>
      </div>
      <div className={styles.list}>
        {stock.map((s) => {
          return (
            <Row
              stock={s}
              error={stockError.find((err: StockError) => err.id === s.id)}
              images={images.find((i) => i.stockId === s.id)}
              handleSaveImages={handleSaveImages}
              tipoImpositivo={tipoImpositivo}
              handleChange={handleChange}
              handleDuplicate={handleDuplicate}
              handleRemove={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
}
