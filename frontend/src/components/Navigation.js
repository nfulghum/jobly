import React, { useContext } from 'react';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const Navigation = ({ logout }) => {

    const { currentUser } = useContext(UserContext);

    const linkProps = {
        underline: 'hover',
        component: NavLink,
        color: 'text.primary'
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Link {...linkProps} to='/'>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <RocketLaunchIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Jobly! Launch your career today!
                        </Typography>
                        {currentUser ?
                            <>
                                <Link sx={{ mr: 2 }} {...linkProps} to="companies">Companies</Link>
                                <Link sx={{ mr: 2 }} {...linkProps} to="jobs">Jobs</Link>
                                <Link sx={{ mr: 2 }} {...linkProps} to="profile">Profile</Link>
                                <Link sx={{ mr: 2 }} onClick={logout} {...linkProps} to="/">Logout</Link>
                                {currentUser.first_name || currentUser.username}
                            </>
                            :
                            <>
                                <Link sx={{ mr: 2 }} {...linkProps} to="signup">Sign Up</Link>
                                <Link sx={{ mr: 2 }} {...linkProps} to="login">Login</Link>
                            </>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}

export default Navigation;