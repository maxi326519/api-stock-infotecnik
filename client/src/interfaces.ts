export interface User{
  name: string
}

export interface Product {
  barCode: string;
  modelo: string;
  marca: string;
  color: string;
  capacidad: string;
  descripcionLarga: string;
  descripcionCorta: string;
  familia: string;
  imgGenerica: string;
  estado: string;
}

export interface Supplier {
  code: number
  name: string;
  address: string;
  poblation: string;
  cifNif: string;
  phone: string;
}

export interface Inventory {
  barCode: string;
  supplier: number;
  product: number;
  price: number;
  amount: number;
  invoiceNumber: number;
  invoiceFile: string;
  tipoImpositivo: tipoImpositivo;
  precioCompraIVA: number;
  precioCompraSIVA: number;
  precioVentaIVA: number;
}

export enum tipoImpositivo {
  IVA,
  Recargo,
  Equivalencia,
  REBU
}

export enum BarCode{
  Coded128,
  Code39,
  UPCA,
  UPCE,
  EAN8,
  EAN13
}

export interface Invoices {
  name: string
}

export interface State {
  user: User;
  products: Array<Product>;
  suppliers: Array<Supplier>;
  inventory: Array<Inventory>;
  invoices: Array<Invoices>;
}