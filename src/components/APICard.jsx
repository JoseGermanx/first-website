import {useState, useEffect } from 'react'

const APICard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/endpoint.json')
        .then(response => response.json())
        .then(data => setData(data))
    }, [data])

  return (
    <div>
        <h1>API Card</h1>
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <h2>{item.label}</h2>
                    <p>{item.completed ? 'Completada' : 'Pendiente'}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default APICard