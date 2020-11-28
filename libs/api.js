export const apiUrl = process.env.apiUrl || 'http://localhost:3000/api';

//functions to help calling project api

export const callPostAPI = async (path, params) => {
    return await fetch(`${apiUrl}/${path}`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    });
};

export const callDeleteAPI = async (path) => {
    return await fetch(`${apiUrl}/${path}`,{
        method: 'DELETE'
    });
};

export const callGetAPI = async (path) => {
    const response = await fetch(`${apiUrl}/${path}`);
    return await response.json();
};