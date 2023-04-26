import { useState, useEffect } from "react";

import styles from "./Colores.module.css";

interface Props {
  data: string[];
  handleSubmit: (newData: string[]) => void;
  handleClose: () => void;
}

export default function Colores({ data, handleSubmit, handleClose }: Props) {
  const [newData, setNewData] = useState<string>("");
  const [localData, setLocalData] = useState<string[]>([]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  function handleLocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(localData);
    handleClose();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewData(event.target.value);
  }

  function handleAddData() {
    if (newData !== "" && !localData.some((c) => c === newData)) {
      setLocalData([...localData, newData]);
      setNewData("");
    }
  }

  function handleRemove(data: string) {
    setLocalData(localData.filter((c) => c !== data));
  }

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleLocalSubmit}>
        <div className={styles.close}>
          <h4>Colores</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={styles.categoriesList}>
          {localData.length > 0 ? (
            localData.map((data, index) => (
              <div key={index} className={styles.row}>
                <span>{data}</span>
                <div className="btn-close" onClick={() => handleRemove(data)} />
              </div>
            ))
          ) : (
            <span className={styles.empty}>Empty</span>
          )}
        </div>
        <div>
          <div className={styles.formContainer}>
            <label htmlFor="add">.</label>
            <input
              className="form-control"
              id="add"
              type="text"
              value={newData}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleAddData}
            >
              +
            </button>
          </div>
          <button className="btn btn-success" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
