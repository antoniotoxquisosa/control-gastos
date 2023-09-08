import { useEffect, useState } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  const [mensaje, setMensaje] = useState(""); // [valor, funcion
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setCantidadGasto] = useState("");
  const [categoriaGasto, setCategoriaGasto] = useState("");
  const [fecha, setFecha] = useState(""); 
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombreGasto(gastoEditar.nombre);
      setCantidadGasto(gastoEditar.cantidad);
      setCategoriaGasto(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, []);

  const ocultarModal = () => {
    setModal(false);
    setAnimarModal(false);
    setGastoEditar({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombreGasto, cantidadGasto, categoriaGasto].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    const gasto = {
      nombre: nombreGasto,
      cantidad: cantidadGasto,
      categoria: categoriaGasto,
      id,
      fecha
    };
    guardarGasto(gasto);
    setMensaje("");
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Cerrar modal" onClick={ocultarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.id ? "Editar Gasto" : "Nuevo gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="añade el nombre del gasto"
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad del gasto</label>
          <input
            type="number"
            id="cantidad"
            placeholder="añade la cantidad del gasto"
            value={cantidadGasto}
            onChange={(e) => setCantidadGasto(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoriaGasto}
            onChange={(e) => setCategoriaGasto(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos varios">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.id ? "Guardar cambios" : "Añadir gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
