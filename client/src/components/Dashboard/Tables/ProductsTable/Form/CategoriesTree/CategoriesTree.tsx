import { useState } from "react";
import Chart from "react-google-charts";

import style from "./CategoriesTree.module.css";

type Node = {
  name: string;
  children?: Node[];
};

type Props = {
  data: Node[];
  handleClose: () => void;
};

const CategoriesTree = ({ data, handleClose }: Props) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newCategory = event.target.value;
    setNewCategory(newCategory);
  }

  const handleAddCategory = () => {
    if (newCategory) {
      const newNode: Node = { name: newCategory };
      if (selectedNode) {
        if (!selectedNode.children) {
          selectedNode.children = [];
        }
        selectedNode.children.push(newNode);
      } else {
        data.push(newNode);
      }
      setNewCategory("");
    }
  };

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    setEditingCategory(false);
  };

  const handleEditCategory = (node: Node) => {
    // TODO: implement edit functionality
    setEditingCategory(true);
  };

  // Construir el array de datos para la gráfica
  const chartData = data.reduce<string[]>((acc, node) => {
    acc.push(node.name);
    if (node.children) {
      acc.push(...node.children.map((child) => child.name));
    }
    return acc;
  }, []);

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.close}>
          <h4>Categorias</h4>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={style.chartContainer}>
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="WordTree"
            loader={<div>Loading Chart</div>}
            data={[["Phrases"], ...chartData.map((name) => [name])]}
            options={{
              wordtree: {
                format: "implicit",
                word: selectedNode?.name || "",
              },
            }}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const [selectedItem] = chart.getSelection();
                  if (selectedItem) {
                    const node = data[selectedItem.row + 1];
                    handleNodeClick(node);
                  } else {
                    setSelectedNode(null);
                  }
                },
              },
            ]}
          />
        </div>
        {edit ? (
          <div className={style.inputs}>
            <div className="form-floating">
              <input
                id="category"
                className="form-control"
                type="text"
                value={newCategory}
                onChange={handleChange}
              />
              <label htmlFor="category" className="form-label">
                New category:
              </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleAddCategory}
              type="button"
            >
              Add
            </button>
          </div>
        ) : null}
        <div className={style.buttons}>
          <button className="btn btn-primary" type="button">
            Seleccionar
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setEdit(!edit)}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTree;
