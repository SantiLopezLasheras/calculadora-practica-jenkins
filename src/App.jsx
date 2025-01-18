import Calculadora from "./Calculadora.jsx";

function App() {
  return (
    <div className="min-h-screen bg-fondoCalculadora flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-botonCalculadora">
        Calculadora
      </h1>
      <Calculadora />
    </div>
  );
}

export default App;
