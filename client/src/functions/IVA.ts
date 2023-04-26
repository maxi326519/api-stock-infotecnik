import { TipoImpositivo } from "../interfaces";

export default function calcularIVA(
  tipoImpositivo: TipoImpositivo,
  name: string,
  value: number | string,
  iva: number,
  recargo: number
) {
  let prices = {};
  switch (tipoImpositivo) {
    case TipoImpositivo.IVA:
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: (Number(value) * (iva / 100)).toFixed(2),
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: (Number(value) / (iva / 100)).toFixed(2),
          precioIVA: value,
        };
      }
      break;
    case TipoImpositivo.Recargo:
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: (Number(value) * (iva / 100)).toFixed(2),
          recargo: (Number(value) * (recargo / 100)).toFixed(2),
          total:
            Number(value) +
            (Number(value) * (iva / 100)).toFixed(2) +
            (Number(value) * (recargo / 100)).toFixed(2),
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: (Number(value) / (iva / 100)).toFixed(2),
          precioIVA: value,
          recargo: ((Number(value) / (iva / 100)) * (recargo / 100)).toFixed(2),
          total:
            (Number(value) / (iva / 100)).toFixed(2) +
            Number(value) +
            ((Number(value) / (iva / 100)) * (recargo / 100)).toFixed(2),
        };
      }
      break;
    case TipoImpositivo.REBU:
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: value,
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: value,
        };
      }
      break;
    default:
      break;
  }

  return prices;
}
