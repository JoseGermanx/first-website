import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";
// import { useStore } from "@nanostores/react";

// import { todos, addTarea } from "../tareasStore";

export default function TareasList() {
  const [tarea, setTarea] = useState({});
  const [label, setLabel] = useState("");
  // const $tareas = useStore(todos);

  const labelHandler = (e) => {
    setLabel(e.target.value);
  };

  const enviarTarea = (e) => {
    e.preventDefault();
    setTarea({ label: "Tarea 1", done: false });
    fetch(apiUrl + "addtodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: label, done: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      document.getElementById('tarea').value = '';
      location.reload();
    
    };
      
  return (
    <div className="container flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-8">App Lista de tareas</h1>
      <p className="flex justify-center">Aplicacion de lista de tareas, que se conecta a un back-end para guardar, listar, editar y borrar tareas.</p>     
      <form className="flex justify-center mt-4">
        <label className="p-2" htmlFor="tarea">
          Agrega una tarea:
        </label>
        <input
          className="border-2 border-gray-300 text-gray-800 rounded-sm"
          type="text"
          name="tarea"
          id="tarea"
          onChange={(e) => labelHandler(e)}
        />
        <button
          className=" bg-gray-700 text-white p-2"
          type="submit"
          onClick={(e) => enviarTarea(e)}
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
