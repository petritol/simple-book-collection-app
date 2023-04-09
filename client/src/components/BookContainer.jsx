import React, { useState, useEffect, useRef } from "react";
import { loadBooks, addBook, deleteBook } from "../api";
import BookForm from "./BookForm";
import BookList from "./BookList";

function BookContainer() {
  const [ books, setBooks ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isLastBookReceived, setIsLastBookReceived ] = useState(false);

  const doFetch = useRef(true);

  async function handleLoadBooks() {
    const res = await loadBooks(page);
    if (res.data) {
      setBooks(prevBooks => [...prevBooks, ...res.data]);
      setPage(page + 1);
      setIsLoading(false);
      if (res.data.length === 0)
        setIsLastBookReceived(true);
    }
  }

  useEffect(() => {
    // Prevent fetchBooks() from being called twice on dev environments with React.strictMode
    if (doFetch.current) {
      handleLoadBooks();
      doFetch.current = false;
    }
  }, []);

  async function handleAddBook(name, author) {
    setIsLoading(true);
    const res = await addBook(name, author);
    if (res.data) {
      const newBook = {
        id: res.data['id'],
        name: name,
        author: author,
        timestamp: res.data['timestamp']
      };
      setBooks(prevBooks => [newBook, ...prevBooks]);
    }
    setIsLoading(false);
  }

  async function handleDeleteBook(id) {
    setIsLoading(true);
    const res = await deleteBook(id);
    if (res) {
      const updatedBooks = books.filter((book) => id !== book.id);
      setBooks(updatedBooks);
    }
    if (books.length < 20 && !isLastBookReceived)
      handleLoadBooks();
    setIsLoading(false);
  }

  return (
    <>
      <BookForm addBook={handleAddBook} />
      {isLoading ? <div>Loading...</div> :
        <BookList
          books = {books}
          deleteBook={handleDeleteBook}
          loadBooks={handleLoadBooks}
          isLastBookReceived={isLastBookReceived}
        />}
    </>
  )
}

export default BookContainer;