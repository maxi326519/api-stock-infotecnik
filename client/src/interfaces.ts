export interface User{
  name: string
}

export interface Product {
  id: string;
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

export interface Stock{
  typeBarCode: string;
  barCode: number;
  supplier: number;
  invoice: number;
  product: string;
  price: number;
  amount: number;
  type: string;/* enum[IMEI, nroSerie] */
  img: Array<string>;
  status: number;
  nro: number;
}

export interface Invoices{
  product: number;
  supplier: number;
  equivalencia: number;
  tipoImpositivo: tipoImpositivo;
  precioCompraIVA: number;
  precioCompraSIVA: number;
  precioVentaIVA: number;
  invoiceNumber: number;
  invoiceFile: string;
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

export interface State {
  user: User;
  products: Array<Product>;
  suppliers: Array<Supplier>;
  stock: Array<Stock>;
  invoices: Array<Invoices>;
}