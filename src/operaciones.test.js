import { calcular } from "./operaciones";

describe("calcular", () => {
  test("debe sumar correctamente", () => {
    expect(calcular(2, 3, "+")).toBe(5);
    expect(calcular(-2, 3, "+")).toBe(1);
    expect(calcular(2, -3, "+")).toBe(-1);
  });

  test("debe restar correctamente", () => {
    expect(calcular(5, 3, "-")).toBe(2);
    expect(calcular(3, 5, "-")).toBe(-2);
    expect(calcular(-3, -5, "-")).toBe(2);
  });

  test("debe multiplicar correctamente", () => {
    expect(calcular(2, 3, "*")).toBe(6);
    expect(calcular(-2, 3, "*")).toBe(-6);
    expect(calcular(2, -3, "*")).toBe(-6);
    expect(calcular(0, 5, "*")).toBe(0);
  });

  test("debe dividir correctamente", () => {
    expect(calcular(6, 3, "/")).toBe(2);
    expect(calcular(5, 2, "/")).toBe(2.5);
    expect(calcular(5, 0, "/")).toBe("No se puede dividir por cero");
    expect(calcular(-6, 3, "/")).toBe(-2);
  });
});
