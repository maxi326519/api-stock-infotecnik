export interface Stock {
  id?: string;
  numero?: number;
  estado: string;
  fechaAlta: string;
  cantidad: number;
  catalogo: boolean;
  IMEISerie?: string;
  precioIVA: number;
  precioSinIVA: number;
  precioIVAINC: number;
  recargo: number;
  total: number;
  detalles?: string;
  ProductId?: string;
}
