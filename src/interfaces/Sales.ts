export interface SaleInvoice {
  id?: string;
  numero?: string;
  fecha: Date;
  total: number;
  tipoImpositivo: TipoImpositivoSale;
  generada: boolean;
  ticketUrl?: string;
  SaleDetails: SaleDetail[];
  PriceDetails: PriceDetail[];
}

export interface SaleDetail {
  id?: string;
  fecha: Date;
  precioUnitario: number;
  cantidad: number;
  ProductId?: string;
  StockId?: string;
  InvoiceId?: string;
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