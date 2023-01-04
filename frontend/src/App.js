import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import JoblyRoutes from './routes/JoblyRoutes';
import UserContext from './components/UserContext';
import LoadingSpinner from './components/LoadingSpinner';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useLocalStorage from './hooks/useLocalStorage';
import jwt_decode from 'jwt-decode';
import JoblyApi from './api';

export const TOKEN_STORAGE_ID = "jobly-token"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (e) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, e };
    }
  };

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, e };
    }
  };

  if (!infoLoaded) return <LoadingSpinner />

  return (

    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navigation logout={logout} />
          <JoblyRoutes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
