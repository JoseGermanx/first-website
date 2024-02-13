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
        <div>
            {loading ? "Cargando..." : datos.map(todo => (
                <div key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
                </div>
            ))}
        </div>
    );
}