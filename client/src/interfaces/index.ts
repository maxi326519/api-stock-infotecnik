import {
  Invoices,
  TotalDetail,
  Stock,
  TipoImpositivo,
  initInvoice,
  initDetail,
} from "./invoices";

interface Login {
  email: string;
  password: string;
}

interface User {
  id: string;
  rol: string;
  name: string;
  userName: string;
  email: string;
}

interface PostUser {
  rol: string;
  name: string;
  userName: string;
  email: string;
  password: string;
}

enum Rol {
  Admin = "Admin",
  Contador = "Contador",
}

interface Product {
  id: string;
  codigo: string;
  modelo: string;
  marca: string;
  color: string;
  capacidad: string;
  descLarga: string;
  descCorta: string;
  Images: string[];
  CategoryId: string;
}

interface Supplier {
  id: string;
  numero: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
}

interface Client {
  id: string;
  numero: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
}

interface Transactions {
  id: string;
  fecha: string;
  fechaValor: string;
  movimiento: string;
  masDatos: string;
  importe: number;
  saldo: number;
  InvoiceId: string;
}

enum BarCode {
  Ninguno = "",
  Code128 = "Code128",
  Code39 = "Code39",
  UPCA = "UPC-A",
  UPCE = "UPC-E",
  EAN8 = "EAN8",
  EAN13 = "EAN13",
}

interface Config {
  ivaSuperReducido: number;
  ivaReducido: number;
  ivaGeneral: number;
  recargo: number;
}

interface RootState {
  profile: User;
  users: User[];
  attributes: {
    capacidades: Array<string>;
    colores: Array<string>;
    categories: Array<any>;
    types: Array<string>;
  };
  products: Array<Product>;
  suppliers: Array<Supplier>;
  clients: Array<Client>;
  stock: Array<Stock>;
  invoices: Array<Invoices>;
  transactions: Array<Transactions>;
  config: Config;
  loading: boolean;
}

export type {
  RootState,
  Invoices,
  TotalDetail,
  Login,
  User,
  PostUser,
  Product,
  Supplier,
  Stock,
  Client,
  Transactions,
  Config,
};

export { TipoImpositivo, BarCode, Rol, initInvoice, initDetail };
