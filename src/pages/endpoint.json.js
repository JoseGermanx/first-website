
const getTareas = async () => {
    const response = await fetch("http://192.168.1.87:3245/todos");
    return response
};


export const GET = async ({  }) => {
    try {
        const response = await getTareas()
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            headers: {
                "content-type": "application/json",
            },
            status: 500,
        });
    }
};