import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import JoblyRoutes from './routes/JoblyRoutes';
import UserContext from './components/UserContext';
import LoadingSpinner from './components/LoadingSpinner';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from 'jsonwebtoken';
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
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
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
      console.error("signup failed", e)
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

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  };

  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }



  if (!infoLoaded) return <LoadingSpinner />

  return (

    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
          <Navigation logout={logout} />
          <JoblyRoutes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
