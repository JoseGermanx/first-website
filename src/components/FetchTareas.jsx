import {useState, useEffect} from 'react';
import { todos, fetchTodos  } from '../todosStore'
import { useStore } from '@nanostores/react'

export default function FetchTareas() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);

    const $todos = useStore(todos);

    useEffect(() => {
        fetch('http://192.168.1.88:3245/todos')
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
    , [datos]);
    

    return (
        <div class="columns-2 mx-56 w-auto mt-4">
        <ul role="list" class="divide-y divide-gray-100 mx-auto">
            {loading ? "Cargando..." : $todos.map(todo => (
                <li class="flex justify-between gap-x-6 py-5" key={todo.id}>
                    <div class="flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                    <h3 class="text-sm font-semibold leading-6 text-gray-900">{todo.label}</h3>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{todo.done ? 'Completed' : 'Not completed'}</p>
                    </div>
                    </div>
                </li>
            ))}
        </ul>
        </div>
    );
}