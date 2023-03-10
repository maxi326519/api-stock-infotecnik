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

export interface Inventory{
  id: string;
  IMEISerie: string;/* enum[IMEI, nroSerie] */
  status: number;
  TipoCodigoDeBarras: string;
  codigoDeBarras: number;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  img: Array<File>;
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

export interface Invoices{
  fecha: string;
  numero: number;
  archivo: string;
  detalles: Inventory[];
  tipoImpositivo: tipoImpositivo;
  supplier: string;
}

export enum tipoImpositivo {
  IVA,
  Recargo,
  Equivalencia,
  REBU
}