import React, { useState } from 'react';

const SearchForm = ({ searchFor }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="searchTerm"
                    placeholder="Enter here"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SearchForm;