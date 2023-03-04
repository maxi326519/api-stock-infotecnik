import { Product, Supplier, Stock } from "../../interfaces";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const POST_PRODUCT = "POST_PRODUCT";
export const POST_SUPPLIER = "POST_SUPPLIER";
export const POST_STOCK = "POST_STOCK";

export function postInventory(newInventory: Stock) {
  return {
    type: POST_STOCK,
    payload: newInventory,
  };
}

export function postProduct(newProducto: Product) {
  return {
    type: POST_PRODUCT,
    payload: newProducto,
  };
}

export function postSupplier(newSupplier: Supplier) {
  return {
    type: POST_SUPPLIER,
    payload: newSupplier,
  };
}