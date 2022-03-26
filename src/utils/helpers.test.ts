import { calculateIncomeTaxWithholdings } from "./helpers";

describe("calculateIncomeTaxWithholdings", () => {
  it("should calculate correct under 24000", () => {
    const real = 24000 * 0.15;
    expect(calculateIncomeTaxWithholdings(24000)).toBe(real);
  });

  it("should calculate correct when given zero", () => {
    expect(calculateIncomeTaxWithholdings(0)).toBe(0);
  });

  it("should return 0 when given value was negative", () => {
    expect(calculateIncomeTaxWithholdings(-1000)).toBe(0);
  });

  it("should calculate correct when value grater than 24000 and less than 53000", () => {
    const real = 10750;
    expect(calculateIncomeTaxWithholdings(58000)).toBe(real);
  });

  it("should calculate correct when value grater than 53000 and less than 190.000", () => {
    const real = 22090;
    expect(calculateIncomeTaxWithholdings(100000)).toBe(real);
  });

  it("should calculate correct when value grater than 190.000 and less than 650.000", () => {
    const real = 227390;
    expect(calculateIncomeTaxWithholdings(700000)).toBe(real);
  });

  it("should calculate correct when value grater than 650.000 ", () => {
    const real = 267390;
    expect(calculateIncomeTaxWithholdings(800000)).toBe(real);
  });
});
