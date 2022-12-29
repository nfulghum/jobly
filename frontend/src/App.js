import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import JoblyRoutes from './routes/Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <JoblyRoutes />
        <h1>hello</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
