import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../interfaces";
import {
  loading,
  closeLoading,
} from "../../../../../../redux/actions/loading/loading";
import swal from "sweetalert";

import styles from "./Categories.module.css";
import { postCategories } from "../../../../../../redux/actions/products";

interface Props {
  handleClose: () => void;
}

export default function Categories({ handleClose }: Props) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>("");
  const [categoriesList, setCategories] = useState<string[]>([]);
  /*   const categories: string[] = useSelector(
    (state: RootState) => state.config
  ); */

  const [categories, setCataegoria] = useState([]);

  useEffect(() => {
    setCategories(categories);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  function handleAddCategory() {
    if (category !== "" && !categoriesList.some((c) => c === category)) {
      setCategories([...categoriesList, category]);
      setCategory("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(loading());
    dispatch<any>(postCategories(categoriesList))
      .then(() => {
        handleClose();
        dispatch(closeLoading());
        swal(
          "Actualizado",
          "Se actualizaron las categorias con exito",
          "success"
        );
      })
      .catch((e: any) => {
        dispatch(closeLoading());
        swal(
          "Error",
          "Ocurrio un error al actualizar las caterogrias",
          "error"
        );
        console.log(e);
      });
  }

  function handleRemove(category: string) {
    setCategories(categoriesList.filter((c) => c !== category));
  }

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <h4>Categorias</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={styles.categoriesList}>
          {categoriesList.length > 0 ? (
            categoriesList.map((category, index) => (
              <div key={index} className={styles.row}>
                <span>{category}</span>
                <div
                  className="btn-close"
                  onClick={() => handleRemove(category)}
                />
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
              value={category}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleAddCategory}
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
