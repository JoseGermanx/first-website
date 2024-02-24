import {useState, useEffect} from 'react';
import { todos, fetchTodos  } from '../todosStore'
import { useStore } from '@nanostores/react'
import { apiUrl } from '../config/api';

export default function FetchTareas() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [update, setUpdate] = useState('Tarea actualizada');
    const [idUpdate, setIdUpdate] = useState('');
    const [value, setValue] = useState('');
    const [idLabel, setIdLabel] = useState('update' + idUpdate);

    const $todos = useStore(todos);

    useEffect(() => {
        fetch(apiUrl + 'todos')
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

    const doneHandle = (e) => {
        fetch(apiUrl + 'done/' + e.target.value, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        alert(`Tarea ${e.target.value} marcada como completada.`)
        location.reload();
    }

    const handleDelete = (e) => {
        fetch(apiUrl + 'delete/' + e.target.value,
        {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(`Tarea ${e.target.value} eliminada.`)
            location.reload();
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
       
    }

    const modifySpanToUpdate = (e) => {
        setShowSaveButton(true)
        setValue(e.target.value)
        setIdUpdate(e.target.value)
        setIdLabel('update' + e.target.value)

        const span = document.getElementById('update' + idUpdate);
        span.innerHTML = `<input class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' default-value=${span.innerHTML} style={{width: "100%", height: "100%"}} type="text" id="updateInput" onchange="(e)=> handleChange(e)" />`


    }

    const handleChange = (e) => {
        addEventListener('change', (e) => {
        setUpdate(e.target.value)
        console.log(update)
        })
    }
   

    const handleSave = (e) => {

        fetch(apiUrl + 'update/' + idUpdate,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({label: update})
        }
        )
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        }
        )
        alert(`Tarea ${idUpdate} actualizada.`)
        location.reload();
    }

    return (
        <div className="columns-1 mx-56 w-auto mt-4">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Completed</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? "Cargando datos..." : datos.map((item, index) => (
                        <tr key={`input-${index}`}>
                            <td className="border px-4 py-2">{item.id}</td>                            
                            <td className="border px-4 py-2" id={'update' + item.id}>{ showSaveButton ? <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue={item.label} style={{width: "100%", height: "100%"}} type="text" id="updateInput" onChange={(e)=> handleChange(e)} /> : item.label}</td>
                            <td className="border px-4 py-2">{item.done ? 'Completed' : 'To Complete'}</td>
                            <td className="border px-4 py-2">
                                {showSaveButton ? <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={handleSave} >Save</button> : 
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={(e)=> modifySpanToUpdate(e)} value={item.id}>Update</button>}
                                {item.done ? <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mx-2">Completed</button> : 
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2" value={item.id} onClick={(e)=> doneHandle(e)}>To Complete</button>}
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value={item.id} onClick={(e)=>handleDelete(e)}>Delete</button>
                            </td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}