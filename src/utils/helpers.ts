export function calculateIncomeTaxWithholdings(incomeTax: number): number {
  if (incomeTax < 0) return 0;
  if (incomeTax <= 24000) {
    return incomeTax * 0.15;
  }
  if (incomeTax <= 53000) {
    return 3600 + (incomeTax - 24000) * 0.2;
  }
  if (incomeTax <= 190000) {
    return 9400 + (incomeTax - 53000) * 0.27;
  }
  if (incomeTax <= 650000) {
    return 46390 + (incomeTax - 190000) * 0.35;
  }
  return 207390 + (incomeTax - 650000) * 0.4;
}

export function getMonthName(month: number) {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString("tr-TR", { month: "long" });
}
