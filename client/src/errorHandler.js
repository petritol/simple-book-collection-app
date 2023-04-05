function errorHandler(error) {
    if (error.response) {
        alert("Server responded with an error: " + error.response.data);
    } else if (error.request) {
        alert("Server not responding");
    } else {
        alert('Error when sending the request: ' + error.message);
    }
}

export default errorHandler;