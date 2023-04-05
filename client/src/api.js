import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/books/"
});

function errorHandler(error) {
    if (error.response) {
        alert("Server responded with an error: " + error.response.data);
    } else if (error.request) {
        alert("Server not responding");
    } else {
        alert('Error when sending the request: ' + error.message);
    }
}

export async function loadBooks(page) {
    try {
        const res = await axiosClient.get('/', {
            params: {
                page: page
            }
        });
        return res;
    } catch (error) {
        errorHandler(error);
    }
}

export async function addBook(name, author) {
    try {
        const res = await axiosClient.post('/', {
            title: name,
            author: author
        });
        return res;
    } catch (error) {
        errorHandler(error);
    }
}

export async function deleteBook(id) {
    try {
        await axiosClient.delete('/', {
            params: {
                id: id
            }
        });
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    }
}