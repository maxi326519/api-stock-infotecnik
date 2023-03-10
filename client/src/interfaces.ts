export interface User{
  name: string
}

export interface Product {
  id: string;
  modelo: string;
  marca: string;
  color: string;
  capacidad: string;
  descLarga: string;
  descCorta: string;
  imgGenerica: string[];
  categoria: string;
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
export interface Stock{
  id: string;
  status: string;
  IMEISerie: string;/* enum[IMEI, nroSerie] */
  TipoCodigoDeBarras: string;
  codigoDeBarras: string;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  imagen: string;
  ProductId: string;
  InvoiceId: string;
}

export interface Invoices{
  id: string
  fecha: string;
  numero: number;
  archivo: string;
  detalles: Stock[];
  tipoImpositivo: string;
  supplier: string;
}

export enum BarCode{
  Coded128,
  Code39,
  UPCA,
  UPCE,
  EAN8,
  EAN13
}

export interface RootState {
  user: User;
  products: Array<Product>;
  suppliers: Array<Supplier>;
  stock: Array<Stock>;
  invoices: Array<Invoices>;
}