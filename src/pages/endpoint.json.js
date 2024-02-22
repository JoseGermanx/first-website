
const getTareas = async () => {
    const response = await fetch("http://192.168.1.88:3245/todos");
    return response
};


export const GET = async ({  }) => {
    return new Response(JSON.stringify(await getTareas()), {
        headers: {
            "content-type": "application/json",
        },
        status: 200,
    });
}