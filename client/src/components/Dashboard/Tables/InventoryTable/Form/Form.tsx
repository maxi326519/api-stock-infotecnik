import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postInvoice } from "../../../../../redux/actions/invoices";
import { Supplier } from "../../../../../interfaces";
import { Stock, RootState, Invoices } from "../../../../../interfaces";

import AddProduct from "./AddProduct/AddProduct";
import AddSupplier from "./AddSupplier/AddSupplier";
import ProductData from "./ProductData/ProductData";
import InvoiceData from "./InvoiceData/InvoiceData";
import SupplierData from "./SupplierData/SupplierData";
import products from "../../../../assets/svg/products.svg";
import supplier from "../../../../assets/svg/supplier.svg";

import style from "./Form.module.css";
import swal from "sweetalert";

interface Props {
  handleForm: () => void;
}

const initialState: Invoices = {
  id: "",
  fecha: "",
  numero: 0,
  archivo: "",
  detalles: [],
  tipoImpositivo: "IVA",
  supplier: "",
};

const initialStock: Stock = {
  id: "",
  IMEISerie: "",
  status: "Nuevo",
  TipoCodigoDeBarras: "",
  codigoDeBarras: "",
  precioSinIVA: 0,
  precioIVA: 0,
  precioIVAINC: 0,
  imagen: "",
  ProductId: "",
  InvoiceId: "",
};

export default function Form({ handleForm }: Props) {
  const invoices = useSelector((state: RootState) => state.invoices);

  const [productsSelected, setProduct] = useState<string[]>([]);
  const [supplierSelected, setSupplier] = useState<Supplier | null>(null);
  const [stock, setStock] = useState<Stock[]>([]); // Datos de los productos seleccionados
  const [invoice, setInvoice] = useState<Invoices>(initialState); // Datos de la factura

  const [addProducts, setFormProducts] = useState<boolean>(false);
  const [addSupplier, setFormSuppliers] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setStock(
      productsSelected.map((p) => {
        return { ...initialStock, product: p };
      })
    );
  }, [productsSelected]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    /*     try{
      dispatch(postInventory(inventory))
      handleClose();
      swal("Guardado", "Su inventario se guardo correctamente", "success");
    }catch(err){
      swal("Error", "Hubo un error al guardar el nuevo inventario", "error");
    } */
  }

  function handleClose(): void {
    handleForm();
    setProduct([]);
    setSupplier(null);
    setStock([]);
    setInvoice(initialState);
  }

  /* Formularios */
  function handleFormProduct(): void {
    setFormProducts(!addProducts);
  }

  function handleFormSuppliers(): void {
    setFormSuppliers(!addSupplier);
  }

  return (
    <div className={style.container}>
      {addProducts ? (
        <AddProduct
          productsSelected={productsSelected}
          setProduct={setProduct}
          handleClose={handleFormProduct}
        />
      ) : null}
      {addSupplier ? (
        <AddSupplier
          supplierSelected={supplierSelected}
          setSupplier={setSupplier}
          handleClose={handleFormSuppliers}
        />
      ) : null}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.close}>
          <h4>Agregar inventario</h4>
          <button className="btn btn-danger" onClick={handleClose}>
            X
          </button>
        </div>
        <div className={style.data}>
          <div className={style.flex}>
            <div className={style.dataRight}>
              <div className={style.containerButton}>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleFormProduct}
                >
                  <img src={products} alt="products" />
                  <span>Productos</span>
                </button>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={handleFormSuppliers}
                >
                  <img src={supplier} alt="supplier" />
                  <span>Proveedor</span>
                </button>
              </div>

              <InvoiceData />
              {supplierSelected ? (
                <SupplierData supplier={supplierSelected} />
              ) : null}
              <button type="submit" className="btn btn-success">
                Agregar inventario
              </button>
            </div>
            {/* Products */}
            {productsSelected.length > 0 ? (
              <ProductData
                productsSelected={productsSelected}
                stock={stock}
                setStock={setStock}
              />
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
