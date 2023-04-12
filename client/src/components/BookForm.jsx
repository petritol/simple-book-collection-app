import React, { useState } from "react";
import PropTypes from "prop-types";

function BookForm(props) {
    const [formData, setFormData] = useState({
        bookName: '',
        authorName: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.bookName.length === 0) {
            alert("Book name required!");
            return;
        }
        props.addBook(formData.bookName, formData.authorName);
        setFormData({
            bookName: '',
            authorName: ''
        });
    }

    function handleChange(e) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name<span className="required">*</span>:
                <input
                    type="text"
                    name="bookName"
                    value={formData.bookName} 
                    onChange={handleChange}/>
            </label>
            <label>
                Author:
                <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" /> 
        </form>
    )
}

BookForm.propTypes = {
    addBook: PropTypes.func.isRequired
}

export default BookForm;