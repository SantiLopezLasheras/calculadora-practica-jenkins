import { useState } from "react";
import { calcular } from "./operaciones";

function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operacion, setOperacion] = useState("+");
  const [resultado, setResultado] = useState("");

  const handleCalcular = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    const res = calcular(a, b, operacion);
    setResultado(res);
  };

  return (
    <div className="bg-fondoCalculadora p-8 rounded-lg shadow-md border border-colorBorder h-[300px] max-w-sm w-full">
      <div className="mb-4">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-full p-2 border border-colorBorder rounded"
          placeholder="Primer número"
        />
      </div>
      <div className="mb-4">
        <select
          value={operacion}
          onChange={(e) => setOperacion(e.target.value)}
          className="w-full p-2 border border-colorBorder rounded"
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="w-full p-2 border border-colorBorder rounded"
          placeholder="Segundo número"
        />
      </div>
      <button
        onClick={handleCalcular}
        className="w-full bg-botonCalculadora text-white p-2 rounded hover:bg-botonCalculadoraHover"
      >
        Calcular
      </button>
      {resultado !== "" && (
        <div className="mt-4 text-center text-botonCalculadora">
          <strong>Resultado: </strong> {resultado}
        </div>
      )}
    </div>
  );
}

export default Calculadora;
