export default function calcularIVA(tipoImpositivo: string, name: string, value: number | string) {
  let prices = {};

  switch (tipoImpositivo) {
    case "IVA":
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: Number(value) * 1.21,
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: Number(value) / 1.21,
          precioIVA: value,
        };
      }
      break;
    case "Recargo":
      if (name === "precioSinIVA") {
        prices = {
          precioSinIVA: Number(value) * 1.262,
          precioIVA: value,
        };
      }
      if (name === "precioIVA") {
        prices = {
          precioSinIVA: value,
          precioIVA: Number(value) / 1.21,
        };
      }
      break;
    case "Equivalencia":
        if (name === "precioSinIVA") {
            prices = {
              precioSinIVA: Number(value) * 1.262,
              precioIVA: value,
            };
          }
          if (name === "precioIVA") {
            prices = {
              precioSinIVA: value,
              precioIVA: Number(value) / 1.21,
            };
          }
      break;
    case "REBU":
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
