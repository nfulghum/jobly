import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Home = () => {
    return (
        <ThemeProvider theme={darkTheme}>

        </ThemeProvider>
    )
}

export default Home;