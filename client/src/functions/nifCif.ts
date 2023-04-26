export function validarNifCif(nifCif: string): boolean {
  const nifCifRegex =
    /^[A-HJ-NP-TV-Z\d]{1}\d{7}[A-J\d]$|^[A-HJ-NP-TV-Z][A-HJ-NP-TV-Z\d]{1}\d{6}[A-J\d]$|^[KLM][A-HJ-NP-TV-Z\d]{1}\d{7}$/;
  if (!nifCifRegex.test(nifCif)) {
    return false;
  }

  if (/^\d{8}[A-Z]$/.test(nifCif)) {
    // NIF validation
    const dni = parseInt(nifCif.substr(0, 8), 10);
    const letterIndex = dni % 23;
    const validLetter = "TRWAGMYFPDXBNJZSQVHLCKET".charAt(letterIndex);
    const providedLetter = nifCif.substr(8, 1);
    return validLetter === providedLetter;
  } else {
    // CIF validation
    const cif = nifCif.toUpperCase();
    const controlDigit = parseInt(cif.substr(7, 1), 10);
    const letters = "ABCDEFGHJKLMNPQRSUVW";
    let sum = 0;
    for (let i = 2; i < 8; i++) {
      let digit = parseInt(cif.substr(i, 1), 10);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit =
            parseInt(digit.toString().substr(0, 1), 10) +
            parseInt(digit.toString().substr(1, 1), 10);
        }
      }
      sum += digit;
    }
    const firstLetter = cif.substr(0, 1);
    if (letters.indexOf(firstLetter) === -1) {
      sum += parseInt((firstLetter.charCodeAt(0) - 55).toString(), 10);
    } else {
      sum += parseInt(firstLetter, 10);
    }
    const secondLetter = cif.substr(1, 1);
    if (letters.indexOf(secondLetter) === -1) {
      sum += parseInt((firstLetter.charCodeAt(0) - 55).toString(), 10);
    } else {
      sum += parseInt(secondLetter, 10);
    }
    const computedControlDigit = 10 - (sum % 10);
    return computedControlDigit === controlDigit;
  }
}
