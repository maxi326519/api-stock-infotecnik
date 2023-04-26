export default function isValidIMEI(imei: string): boolean {
  const imeiRegex = /^[0-9]{15}$/;
  if (!imeiRegex.test(imei)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < imei.length - 1; i++) {
    let digit = parseInt(imei[i], 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }
    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(imei[imei.length - 1], 10);
}
