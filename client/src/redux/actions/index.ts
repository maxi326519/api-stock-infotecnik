import { User, Product, Supplier, Inventory, Invoices } from "../../interfaces";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const POST_PRODUCT = "POST_PRODUCT";
export const POST_SUPPLIER = "POST_SUPPLIER";
export const POST_INVENTORY = "POST_INVENTORY";

interface disAddInventory {
  type: string;
  payload: Inventory;
}

interface disAddProduct {
  type: string;
  payload: Product;
}

interface disAddSupplier {
  type: string;
  payload: Supplier;
}

export function postInventory(newInventory: Inventory) {
  return {
    type: POST_INVENTORY,
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