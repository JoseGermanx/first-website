import {useState, useEffect} from 'react';
import { todos, fetchTodos  } from '../todosStore'
import { useStore } from '@nanostores/react'

export default function FetchTareas() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);

    const $todos = useStore(todos);

    useEffect(() => {
        fetch('http://192.168.1.87:3245/todos')
            .then(response => response.json())
            .then(data => {
                setDatos(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (datos.length > 0) {
            fetchTodos(datos)
        } else {
            fetchTodos([{id: 1, title: 'No hay datos', completed: false}])
        }
       
    }
    , []);

    const doneHandle = (id) => {
        fetch('http://192.168.1.87:3245/done/' + id, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    

    return (
        <div class="columns-1 mx-56 w-auto mt-4">
            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">ID</th>
                        <th class="px-4 py-2">Title</th>
                        <th class="px-4 py-2">Completed</th>
                        <th class="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading & datos.length > 0 ? "Cargando..." : datos.map((item, index) => (
                        <tr key={index}>
                            <td class="border px-4 py-2">{item.id}</td>
                            <td class="border px-4 py-2">{item.label}</td>
                            <td class="border px-4 py-2">{item.completed ? 'Completada' : 'Pendiente'}</td>
                            <td class="border px-4 py-2">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={(e)=> doneHandle(e.target.value)}>Eliminar</button>
                            </td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}