import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Form from "./Form/Form";
import Details from "./Details/Details";
import SupplierDetails from "./SupplierDetails/SupplierDetails";

import styles from "../../Dashboard.module.css";
import style from "./InventoryTable.module.css";
import InventoryRow from "./InventoryRow/InventoryRow";
import { Product, Stock, Supplier } from "../../../../interfaces";

interface Selection {
  product: Product;
  stock: Stock;
  supplier: Supplier;
}

export default function InventoryTable() {
  const stock = useSelector((state: any) => state.stock);
  const products = useSelector((state: any) => state.products);
  const suppliers = useSelector((state: any) => state.suppliers);
  const [search, setSearch] = useState<string>("");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [details, setDetails] = useState(false);
  const [supplierDetails, setSupplierdetails] = useState(false);
  useEffect(() => {
    const filter = stock.filter(() => {
      if (search === "") return true;
      return false;
    });
    setRows(filter);
  }, [stock, search]);

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  function handleCloseForm(): void {
    setForm(!form);
  }

  function handleSelection(stock: Stock | null){
    if(stock === null){
      setSelection(null);
    }else{
      const product: Product = products.find((p: Product) => p.id === stock.ProductId);
      const supplier: Supplier = suppliers.find((s: Supplier) => s.id === stock.ProductId);

      const slection: Selection = {
        product,
        stock,
        supplier
      }

      setSelection(slection);
    }
  }

  function handleCloseDetails(stock: Stock | null): void {
    setDetails(!details);
    handleSelection(stock);
  }

  function handleCloseSupplierDetails(stock: Stock | null): void {
    setSupplierdetails(!supplierDetails);
    handleSelection(stock);
  }

  return (
    <div className={styles.dashboardList}>
      {form ? <Form handleClose={handleCloseForm} /> : null}
      {details ? (
        <Details
          product={selection?.product}
          stock={selection?.stock}
          handleClose={handleCloseDetails}
        />
      ) : null}
      {supplierDetails ? (
        <SupplierDetails
          supplier={selection?.supplier}
          handleClose={handleCloseSupplierDetails}
        />
      ) : null}
      <h3>Inventario</h3>
      <div className={styles.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar inventario"
          onChange={handleChangeSearch}
        />
        <button className="btn btn-primary" type="button" onClick={handleCloseForm}>
          Agregar inventario
        </button>
      </div>
      <div className={styles.dashboardList__grid}>
        <div className={`${style.card} ${style.firstrow}`}>
          <span>Codigo de barras</span>
          <span>Nro de Serie</span>
          <span>Estado</span>
          <span>Marca / Modelo / Color / Capacidad</span>
          <span>Precio</span>
          <span>Precio IVA</span>
          <span>Precio IVA INC</span>
          <span>Proveedor</span>
          <span>Detalle</span>
        </div>
        <div className={styles.contentCard}>
          {rows.length <= 0 ? (
            <div className={styles.listEmpty}>
              <span>No hay inventario</span>
              <span>¿Quieres agregar uno?</span>
              <button className="btn btn-primary" onClick={handleCloseForm}>
                Agregar Inventario
              </button>
            </div>
          ) : (
            rows?.map((stock: Stock) => (
              <InventoryRow
                key={stock.id}
                stock={stock}
                handleProveedor={handleCloseSupplierDetails}
                handleDetails={handleCloseDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
