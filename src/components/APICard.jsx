import {useState, useEffect } from 'react'

const APICard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/endpoint.json')
        .then(response => response.json())
        .then(data => setData(data))
    }, [])

  return (
    <>
        <div className=''>
            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">ID</th>
                        <th class="px-4 py-2">Title</th>
                        <th class="px-4 py-2">Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td class="border px-4 py-2">{item.id}</td>
                            <td class="border px-4 py-2">{item.label}</td>
                            <td class="border px-4 py-2">{item.completed ? 'Completada' : 'Pendiente'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default APICard