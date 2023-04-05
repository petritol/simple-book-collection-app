import React, { useRef } from "react";
import PropTypes from "prop-types";

function BookList(props) {
    const listInnerRef = useRef();

    function handleScroll(e) {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          if (scrollTop + clientHeight === scrollHeight) {
            props.loadBooks();
          }
        }
    };
    return (
            <ul
                className="book-list"
                onScroll={() => handleScroll()}
                ref={listInnerRef}
            >
                {props.books.map((book) => (
                    <li
                        key = {book.id}
                        id = {book.id}
                    >
                        <input
                            className="delete-button"
                            type="button"
                            value="X"
                            onClick={
                                () => props.deleteBook(book.id)
                            }
                        />
                        <span> {book.name}</span>
                        {book.author && <span> - {book.author}</span>}
                        <span> ({book.timestamp})</span>
                        
                    </li>
                )) }
            </ul>
    );
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
}

export default BookList