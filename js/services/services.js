const postData = async (url, data) => { //асихронные процессы
    const res = await fetch(url, { //ждет получаения ответа
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: data
    });

    return await res.json();
};

const getResources = async url => { //асихронные процессы
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export default postData;
export {
    getResources
};