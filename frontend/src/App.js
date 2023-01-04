import React from 'react';
import Navigation from './components/Navigation';
import JoblyRoutes from './routes/JoblyRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (

    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navigation />
        <JoblyRoutes />
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
