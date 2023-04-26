export interface Invoices {
  id?: string;
  tipo: string;
  fecha: string;
  numero: string;
  pendiente: boolean;
  archivo: string;
  tipoImpositivo: TipoImpositivo;
  total: number;
  TotalDetails: TotalDetail[];
  SupplierId: string;
  StockId: Stock[];
  Stocks?: Stock[];
}

export interface Stock {
  id: string;
  fechaAlta: string;
  estado: string;
  cantidad: number;
  catalogo: boolean;
  IMEISerie: string;
  tipoCodigoDeBarras: string;
  codigoDeBarras: string;
  precioSinIVA: number;
  precioIVA: number;
  precioIVAINC: number;
  recargo: number;
  total: number;
  detalles: string;
  Images: string[];
  ProductId?: string;
  SupplierId: string;
  InvoiceId?: string;
}

export interface TotalDetail {
  id?: string;
  concepto: string;
  cantidad: number;
  baseImponible: number;
  ivaPorcentaje: number;
  ivaMonto: number;
  recargoPorcentaje: number;
  recargoMonto: number;
}

export enum TipoImpositivo {
  IVA = "IVA",
  Recargo = "Recargo",
  REBU = "REBU",
}

export const initInvoice: Invoices = {
  fecha: new Date().toISOString().split("T")[0],
  numero: "",
  tipo: "",
  pendiente: true,
  archivo: "",
  total: 0,
  tipoImpositivo: TipoImpositivo.IVA,
  TotalDetails: [],
  SupplierId: "",
  StockId: [],
};

export const initDetail: TotalDetail = {
  concepto: "",
  cantidad: 0,
  baseImponible: 0,
  ivaPorcentaje: 0,
  ivaMonto: 0,
  recargoPorcentaje: 0,
  recargoMonto: 0,
};
