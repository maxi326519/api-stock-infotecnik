import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Invoices, Product, Stock, Supplier } from "../../../../interfaces";

import Form from "./Form/Form";
import Details from "./Details/Details";
import SupplierDetails from "./SupplierDetails/SupplierDetails";
import InventoryRow from "./InventoryRow/InventoryRow";

import style from "./InventoryTable.module.css";
import add from "../../../../assets/svg/add.svg";
interface Selection {
  product: Product;
  stock: Stock;
  supplier: Supplier;
  invoice: Invoices;
}

export default function InventoryTable() {
  const stock = useSelector((state: any) => state.stock);
  const products = useSelector((state: any) => state.products);
  const suppliers = useSelector((state: any) => state.suppliers);
  const invoices = useSelector((state: any) => state.invoices);
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

  function handleSelection(stock: Stock | null) {
    if (stock === null) {
      setSelection(null);
    } else {
      const product: Product = products.find(
        (p: Product) => p.id === stock.ProductId
      );
      const supplier: Supplier = suppliers.find(
        (s: Supplier) => s.id === stock.SupplierId
      );
      const invoice: Invoices = invoices.find(
        (i: Invoices) => i.id === stock.InvoiceId
      );

      const selection: Selection = {
        product,
        stock,
        supplier,
        invoice,
      };
      setSelection(selection);
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
    <div className={`toLeft ${style.dashboardList}`}>
      {form ? (
        <Form
          handleClose={handleCloseForm}
        />
      ) : null}
      {details ? (
        <Details
          product={selection?.product}
          stock={selection?.stock}
          invoice={selection?.invoice}
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
      <div className={style.dashboardList__searchBar}>
        <input
          className="form-control"
          type="search"
          placeholder="Buscar inventario"
          onChange={handleChangeSearch}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={handleCloseForm}
        >
          <img src={add} alt="add" />
          <span>Nuevo inventario</span>
        </button>
      </div>
      <div className={style.dashboardList__grid}>
        <div className={`${style.card} ${style.firstrow}`}>
          <span>Codigo de barras</span>
          <span>Nro de Serie</span>
          <span>Estado</span>
          <span>Marca / Modelo / Color / Capacidad</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span>Precio IVA</span>
          <span>Precio IVA INC</span>
          <span>Proveedor</span>
          <span>Detalle</span>
        </div>
        <div className={style.contentCard}>
          {rows.length <= 0 ? (
            <div className={style.listEmpty}>
              <span>No hay inventario</span>
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
