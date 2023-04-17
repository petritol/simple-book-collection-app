import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost/api/books/"
});

function errorHandler(error) {
    if (error.response) {
        alert("Server responded with an error: " + error.response.data.message);
    } else if (error.request) {
        alert("Server not responding");
    } else {
        alert('Error when sending the request: ' + error.message);
    }
}

export async function loadBooks(page, booksAdded) {
    try {
        const res = await axiosClient.get('/', {
            params: {
                page: page,
                offset: booksAdded
            }
        });
        return res;
    } catch (error) {
        errorHandler(error);
        return [];
    }
}

export async function addBook(name, author) {
    try {
        const res = await axiosClient.post('/', {
            title: name,
            author: author
        });
        alert(res.data.message);
        return res.data.data;
    } catch (error) {
        errorHandler(error);
        return false;
    }
}

export async function deleteBook(id) {
    try {
        await axiosClient.delete('/' + id);
        return true;
    } catch (error) {
        errorHandler(error);
        return false;
    }
}