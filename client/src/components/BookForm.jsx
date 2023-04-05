import React, { useState } from "react";
import PropTypes from "prop-types";

function BookForm(props) {
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (bookName.length === 0) {
            alert("Book name required!");
            return;
        }
        props.addBook(bookName, authorName);
        setBookName('');
        setAuthorName('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name<span className="required">*</span>:
                <input
                    type="text"
                    name="bookName"
                    value={bookName} 
                    onChange={e => setBookName(e.target.value)}/>
            </label>
            <label>
                Author:
                <input
                    type="text"
                    name="authorName"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)} />
            </label>
            <input type="submit" value="Submit" /> 
        </form>
    )
}

BookForm.propTypes = {
    addBook: PropTypes.func.isRequired
}

export default BookForm;