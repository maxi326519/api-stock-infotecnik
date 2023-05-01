export interface User {
  id: string;
  rol: string;
  name: string;
  userName: string;
  password: string;
}

export interface Product {
  id: string;
  modelo: string;
  marca: string;
  color: string;
  capacidad: string;
  descripcionLarga: string;
  descripcionCorta: string;
  imgGenerica: string[];
  categoria: string;
}

export interface Inventory {
  id: string;
  IMEISerie: string /* enum[IMEI, nroSerie] */;
  status: number;
  TipoCodigoDeBarras: string;
  codigoDeBarras: number;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  img: Array<string>;
  product: string;
  invoice: number;
  supplier: number;
}

export interface Supplier {
  id: string;
  code: number;
  nombre: string;
  direccion: string;
  poblacion: string;
  postal: number;
  cifNif: string;
  telefono: string;
}

export interface Client {
  id: string;
  numero: string;
  nombre: string;
  direccion: string;
  cifNif: string;
  poblacion: string;
  postal: number;
  telefono: string;
}

export interface Invoices {
  fecha: string;
  numero: number;
  archivo: string;
  detalles: Inventory[];
  tipoImpositivo: tipoImpositivo;
  supplier: string;
}

export interface Image {
  id: string;
  url: string;
}

export enum tipoImpositivo {
  IVA,
  Recargo,
  Equivalencia,
  REBU,
}

export interface SaleInvoice {
  id: string;
  numero: number;
  fecha: Date;
  tipoImpositivo: string;
  total: number;
  cantidad: number;
  ticket: string;
  SaleDetails: SaleDetail[];
}

export interface SaleDetail {
  id: string;
  date: Date;
  precioUnitario: number;
  cantidad: number;
  ProductId: string;
  StockId: string;
  InvoiceId: string;
}