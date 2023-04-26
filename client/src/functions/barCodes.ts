export default function isBarCodeValid(
  typeBarCode: string,
  barCode: string
): boolean {
  switch (typeBarCode) {
    case "Code128":
      return isCode128Valid(barCode);

    case "Code39":
      return isCode39Valid(barCode);

    case "UPCA":
      return isUPCValid(typeBarCode, barCode);

    case "UPCE":
      return isUPCValid(typeBarCode, barCode);

    case "EAN8":
      return isCode128Valid(barCode);

    case "EAN13":
      return isCode128Valid(barCode);

    default:
      throw new Error("Tipo de código de barras no soportado");
  }
}
/* ---------------------------------CODE-128------------------------------------ */
function isCode128Valid(barCode: string): boolean {
  // Verificar que el código de barras tenga una longitud válida
  if (barCode.length < 2) {
    return false;
  }

  // Verificar que el primer y último caracteres sean asteriscos
  if (barCode.charAt(0) !== "*" || barCode.charAt(barCode.length - 1) !== "*") {
    return false;
  }

  // Verificar que todos los caracteres estén en el conjunto de caracteres válidos
  const validChars = /^[!-~ ]+$/;
  if (!validChars.test(barCode.substring(1, barCode.length - 1))) {
    return false;
  }

  // Verificar que el código de control sea válido
  const code = barCode.substring(1, barCode.length - 2);
  let sum = 0;
  let weight = 1;

  for (let i = code.length - 1; i >= 0; i--) {
    const charValue = code.charCodeAt(i) - 32;
    sum += charValue * weight;
    weight++;
  }

  const codeControl = (sum % 103) + 32;
  const expectedCodeControl = barCode.charCodeAt(barCode.length - 2);

  return codeControl === expectedCodeControl;
}

/* ---------------------------------CODE-39------------------------------------ */
function isCode39Valid(barCode: string): boolean {
  // Verificar que el código de barras tenga una longitud válida
  if (barCode.length < 2) {
    return false;
  }

  // Verificar que todos los caracteres estén en el conjunto de caracteres válidos
  const validChars = /^[0-9A-Z\-\.\$\\/\+\% ]+$/;
  if (!validChars.test(barCode)) {
    return false;
  }

  // Verificar que el código de control sea válido
  const code = barCode.substring(0, barCode.length - 1);
  let sum = 0;

  for (let i = 0; i < code.length; i++) {
    const charValue = getCode39Value(code.charAt(i));
    if (charValue === -1) {
      return false;
    }
    sum += charValue;
  }

  const codeControl = getClosestCode39Value(sum % 43);
  const expectedCodeControl = getCode39Value(
    barCode.charAt(barCode.length - 1)
  );

  return codeControl === expectedCodeControl;
}

function getCode39Value(char: string): number {
  const code39Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%";

  return code39Chars.indexOf(char);
}

function getClosestCode39Value(num: number): number {
  const code39Values = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42,
  ];

  let closestValue = 0;
  let closestDistance = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < code39Values.length; i++) {
    const distance = Math.abs(num - code39Values[i]);
    if (distance < closestDistance) {
      closestValue = code39Values[i];
      closestDistance = distance;
    }
  }

  return closestValue;
}

/* ---------------------------------UPC-A---&&---UPC-E------------------------------------ */
function isUPCValid(typeBarCode: string, barCode: string): boolean {
  if (typeBarCode !== "UPC-A" && typeBarCode !== "UPC-E") {
    return false;
  }

  // Verificar que el código de barras tenga una longitud válida
  if (barCode.length !== 12 && barCode.length !== 7) {
    return false;
  }

  // Verificar que todos los caracteres sean dígitos numéricos
  const numericChars = /^[0-9]+$/;
  if (!numericChars.test(barCode)) {
    return false;
  }

  // Calcular y verificar el código de control
  const code = barCode.substring(0, barCode.length - 1);
  const codeControl = getUPCCodeControl(code);
  const expectedCodeControl = parseInt(barCode.charAt(barCode.length - 1));

  return codeControl === expectedCodeControl;
}

function getUPCCodeControl(code: string): number {
  let sumOdd = 0;
  let sumEven = 0;

  for (let i = 0; i < code.length; i++) {
    const digit = parseInt(code.charAt(i));

    if ((i + 1) % 2 === 0) {
      sumEven += digit;
    } else {
      sumOdd += digit;
    }
  }

  const sum = sumOdd * 3 + sumEven;
  const remainder = sum % 10;

  if (remainder === 0) {
    return 0;
  } else {
    return 10 - remainder;
  }
}

/* ---------------------------------EAN-8---&&---EAN-13------------------------------------ */
function isEANValid(typeBarCode: string, barCode: string): boolean {
  if (typeBarCode !== "EAN-8" && typeBarCode !== "EAN-13") {
    return false;
  }

  // Verificar que el código de barras tenga una longitud válida
  if (barCode.length !== 8 && barCode.length !== 13) {
    return false;
  }

  // Verificar que todos los caracteres sean dígitos numéricos
  const numericChars = /^[0-9]+$/;
  if (!numericChars.test(barCode)) {
    return false;
  }

  // Calcular y verificar el código de control
  const code = barCode.substring(0, barCode.length - 1);
  const codeControl = getEANCodeControl(code);
  const expectedCodeControl = parseInt(barCode.charAt(barCode.length - 1));

  return codeControl === expectedCodeControl;
}

function getEANCodeControl(code: string): number {
  let sumOdd = 0;
  let sumEven = 0;

  for (let i = 0; i < code.length; i++) {
    const digit = parseInt(code.charAt(i));

    if ((i + 1) % 2 === 0) {
      sumEven += digit;
    } else {
      sumOdd += digit;
    }
  }

  const sum = sumOdd * 3 + sumEven;
  const remainder = sum % 10;

  if (remainder === 0) {
    return 0;
  } else {
    return 10 - remainder;
  }
}
