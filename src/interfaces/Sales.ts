export interface SaleInvoice {
  id?: string;
  numero?: string;
  fecha: Date;
  total: number;
  tipoImpositivo: TipoImpositivoSale;
  generada: boolean;
  tipo: TipoCliente;
  pdfUrl?: string;
  SaleDetails: SaleDetail[];
  PriceDetails: PriceDetail[];
  rectifyPdfUrl: string;
}

export interface SaleDetail {
  id?: string;
  fecha: Date;
  concepto: string;
  tipoImpositivo: TipoImpositivoSale;
  baseImponible: number;
  ivaPorcentaje: number;
  ivaMonto: number;
  recargoPorcentaje: number;
  recargoMonto: number;
  cantidad: number;
  ProductId?: number;
  StockId?: string;
  SaleInvoiceId?: string;
}

export interface PriceDetail {
  id?: string;
  metodoDePago: MetodoDePago;
  monto: number;
  nroOperacion?: string;
}

export enum MetodoDePago {
  efectivo = "EFECTIVO",
  tarjeta = "TARJETA",
  transferenciaBancaria = "TRANSFERENCIA BANCARIA",
  bizum = "BIZUM",
  contratoCompraventa = "CONTRATO COMPRAVENTA",
}

export enum TipoImpositivoSale {
  Compuesto = "Compuesto",
  IVA = "IVA",
  RE = "RE",
  REBU = "REBU",
}

export enum TipoCliente {
  PARTICULAR = 1,
  EMPRESA = 2,
}