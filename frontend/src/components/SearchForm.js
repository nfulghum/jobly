import React, { useState } from 'react';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                justifyContent: "center",
                width: 300,
                my: 1,
            }}
            onSubmit={handleSubmit}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Find your dream job"
                inputProps={{ "aria-label": "search-companies" }}
                name="searchTerm"
                value={searchTerm}
                onChange={handleChange}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchForm;

{/* <div className="SearchForm">
<form onSubmit={handleSubmit}>
    <input
        name="searchTerm"
        placeholder="Find your future"
        value={searchTerm}
        onChange={handleChange}
    />
    <button type="submit">Submit</button>
</form>

</div> */}