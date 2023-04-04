import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import BookList from "./BookList";
import errorHandler from "../errorHandler";

function App() {
  const [ books, setBooks ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(true);

  const doFetch = useRef(true);

  const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/books/"
  });

  async function fetchBooks() {
    try {
      const res = await axiosClient.get(`?page=${page}`);
      setBooks(prevState => [...prevState, ...res.data]);
      setPage(page + 1);
      setIsLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    // Prevent fetchBooks() from being called twice on dev environments with React.strictMode
    if (doFetch.current) {
      fetchBooks();
      doFetch.current = false;
    }
  }, []);

  async function addBook(name, author) {
    let id, timestamp = '';
    try {
      const res = await axiosClient.post('/', {
        title: name,
        author: author
      });
      id = res.data['id'];
      timestamp = res.data['timestamp'];
      const newBook = {
        id: id,
        name: name,
        author: author,
        timestamp: timestamp
      };
      setBooks([newBook, ...books]);
    } catch (error) {
      errorHandler(error);
      return;
    }
  }

  async function deleteBook(id) {
    try {
      const res = await axiosClient.delete(`${id}`);
      const updatedBooks = books.filter((book) => id !== book.id);
      setBooks(updatedBooks);
    } catch (error) {
      errorHandler(error);
      return;
    }
  }

  return (
    <div className="App">
      <BookForm addBook={addBook} />
      {isLoading ? <div>Loading...</div> :
        <BookList
          books = {books}
          deleteBook={deleteBook}
          fetchBooks={fetchBooks}
        />
      }
    </div>
  );
}

export default App;
