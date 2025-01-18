export const calcular = (a, b, operacion) => {
  switch (operacion) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "No se puede dividir por cero";
    default:
      return "Operación no aceptada";
  }
};
