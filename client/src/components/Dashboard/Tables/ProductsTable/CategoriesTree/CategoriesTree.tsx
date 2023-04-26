import { useEffect, useState } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";

import style from "./CategoriesTree.module.css";
import add from "../../../../../assets/svg/add.svg";
import remove from "../../../../../assets/svg/delete.svg";
import root from "../../../../../assets/svg/tree.svg";
import { postCategories } from "../../../../../redux/actions/products";
import { useDispatch } from "react-redux";
import {
  closeLoading,
  loading,
} from "../../../../../redux/actions/loading/loading";

const tree = [["id", "childLabel", "parent", "size", { role: "style" }]];

type Props = {
  categories: any;
  handleSelected: (selected: string) => void;
  handleClose: () => void;
};

const CategoriesTree = ({ categories, handleSelected, handleClose }: Props) => {
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState<string>("categorias");
  const [newCategory, setNewCategory] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any>(tree);

  useEffect(() => {
    let newData: any = [];
    if (categories.length <= 0) {
      newData = [...tree, [0, "categorias", -1, 1, "black"]];
    } else {
      newData = [
        ...tree,
        ...categories.map((cat: any) => [
          ...cat,
          1,
          cat[0] === 0 ? "red" : "black",
        ]),
      ];
    }
    console.log(newData);
    setData(newData);
  }, [categories]);

  function handleSubmit() {
    const node = data.find((node: any) => node[1] === selectedNode);
    handleSelected(node[0]);
    handleClose();
  }

  function handlePost() {
    let postData = data.map((node: any) => [node[0], node[1], node[2]]);
    postData.shift();
    dispatch(loading());
    dispatch<any>(postCategories(postData))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(closeLoading());
      });
    setEdit(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setNewCategory(value);
  }

  function handleCancel() {
    const newData = [
      ...tree,
      ...categories.map((cat: any) => [
        ...cat,
        1,
        cat[0] === 0 ? "red" : "black",
      ]),
    ];
    setData(newData);
    setEdit(false);
  }

  function handleAdd() {
    if (newCategory === "") return false;
    const newData = [...data];
    const selected = newCategory.toLocaleLowerCase();
    let exist = false;

    data.forEach((node: any) =>
      node.includes(selected) ? (exist = true) : null
    );

    if (!exist) {
      data.forEach((node: any) => {
        if (node.includes(selectedNode)) {
          newData.push([
            getID(data.length),
            selected,
            Number(node[0]),
            1,
            "black",
          ]);
        }
      });
      setData(newData);
    }
  }

  function getID(length: number) {
    for (let id = length - 1; ; id++) {
      if (data.some((node: any) => node[0] === id)) {
        continue;
      } else {
        return id;
      }
    }
  }

  function handleRemove() {
    if (selectedNode === "categorias") return false;
    swal({
      text: `¿Seguro que desea eliminar la categoria "${selectedNode}"?`,
      icon: "warning",
      buttons: { confirm: true, cancel: true },
    }).then((res: any) => {
      if (res) {
        const remove = data.find((node: any) => node.includes(selectedNode));
        const filter = data.filter((node: any) => {
          if (node.includes(selectedNode)) {
            return false;
          }
          console.log(node[2], remove[0]);
          if (node[2] === remove[0]) {
            return false;
          }
          return true;
        });
        console.log(filter);
        setSelectedNode("categorias");
        setData(filter);
      }
    });
  }

  function handleSelect({ chartWrapper }: any) {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    console.log("seleccionando");
    if (selection) {
      setSelectedNode(selection.word);
      setColor(selection.word);
    }
  }

  function handleRoot() {
    setSelectedNode("categorias");
    setColor("categorias");
  }

  function setColor(word: string) {
    const color = data.map((node: any) => {
      // Si se encuentra cambiar de color
      if (node.includes(word)) {
        return node.map((col: any) => {
          if (col === "black") {
            return "red";
          }
          return col;
        });
      }
      // Si no verifica si tiene el color rojo y cambiarlo a black
      if (node.includes("red")) {
        return node.map((col: any) => {
          if (col === "red") {
            return "black";
          }
          return col;
        });
      }
      return node;
    });
    setData(color);
  }

  const options = {
    wordtree: {
      format: "explicit",
      type: "suffix",
    },
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.close}>
          <h4>Categorias</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <div className={style.chartContainer}>
          <Chart
            chartType="WordTree"
            width="max-content"
            height="500px"
            data={data}
            options={options}
            chartEvents={[
              {
                eventName: "select",
                callback: handleSelect,
              },
            ]}
          />
        </div>
        {edit ? (
          <div className={style.edits}>
            <div className={style.inputs}>
              <button
                className="btn btn-success"
                type="button"
                disabled={selectedNode === "categorias"}
                onClick={handleRoot}
              >
                <img src={root} alt="root" />
              </button>
              <div className="form-floating">
                <input
                  id="category"
                  className="form-control"
                  type="text"
                  value={newCategory}
                  onChange={handleChange}
                />
                <label htmlFor="category" className="form-label">
                  Nueva categoria:
                </label>
              </div>
              <button
                className="btn btn-success"
                onClick={handleAdd}
                type="button"
              >
                <img src={add} alt="add" />
              </button>
              <button
                className="btn btn-danger"
                onClick={handleRemove}
                type="button"
                disabled={selectedNode === "categorias"}
              >
                <img src={remove} alt="remove" />
              </button>
            </div>
            <div className={style.buttons}>
              <button
                className="btn btn-success"
                type="button"
                onClick={handlePost}
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
        ) : (
          <div className={style.buttons}>
            <button
              className="btn btn-success"
              type="button"
              onClick={handleSubmit}
              disabled={selectedNode === "categorias"}
            >
              Seleccionar
            </button>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => setEdit(!edit)}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesTree;
