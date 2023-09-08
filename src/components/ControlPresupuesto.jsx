import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  // const formatearCantidad = presupuesto.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  const [porcentaje, setPorcentaje] = useState(0); // [valor, funcion
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);
    const totalDisponible = presupuesto - totalGastado;
    const porcentajeGastado = ((totalGastado * 100) / presupuesto).toFixed(2);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(porcentajeGastado);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm(
      "¿Estás seguro que deseas iniciar presupuesto y gastos?"
    );
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear app
        </button>
        <p>
          <span>Presupuesto: {formatearCantidad(presupuesto)}</span>
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: {formatearCantidad(disponible)}</span>
        </p>
        <p>
          <span>Gastado: {formatearCantidad(gastado)}</span>
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
