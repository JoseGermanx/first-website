import {useState, useEffect} from 'react';
import { todos, fetchTodos  } from '../todosStore'

export default function FetchApi() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                setDatos(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetchTodos(datos)
    }
    , [datos]);

    return (
        <ul role="list" class="divide-y divide-gray-100 mx-auto">
            {loading ? "Cargando..." : datos.map(todo => (
                <li class="flex justify-between gap-x-6 py-5" key={todo.id}>
                    <div class="flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                    <h3 class="text-sm font-semibold leading-6 text-gray-900">{todo.title}</h3>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{todo.completed ? 'Completed' : 'Not Completed'}</p>
                    </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}