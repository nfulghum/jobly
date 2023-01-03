import React from 'react';
import Navigation from './components/Navigation';
import JoblyRoutes from './routes/JoblyRoutes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <JoblyRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
