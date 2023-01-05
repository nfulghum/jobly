import React, { useContext } from 'react';
import UserContext from './UserContext';
import {
    Grid,
    Box,
    Typography,
    Container,
    Link,
    Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const lightTheme = createTheme({ palette: { mode: 'light' } });

const Home = () => {

    const { currentUser } = useContext(UserContext);


    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    p: 2,
                    mt: 30,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={24} >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        gutterBottom>
                        Jobly
                    </Typography>
                    <Typography
                        sx={{ m: 6 }} variant="h5" align="center" fontFamily={'monospace'} paragraph>
                        Launch your new and exciting career all in one space!
                    </Typography>
                    {currentUser
                        ? <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            gutterBottom>
                            Welcome Back, {currentUser.firstName || currentUser.username}
                        </Typography>
                        : (
                            <Typography variant="h5" align="center" fontFamily={'monospace'} paragraph>
                                <Link sx={{ mr: 8 }} href="login">
                                    Login
                                </Link>
                                <Link href="signup">
                                    Sign up
                                </Link>
                            </Typography>
                        )}
                </Paper>
            </Box>
        </ThemeProvider >
    )
}

export default Home;

{/* <Container maxWidth="sm">
            <Typography
                component="h1"
                variant="h2"
                align="center"
                gutterBottom>
                Jobly
            </Typography>
            <Typography
                variant="h5" align="center" paragraph>
                Launch your new and exciting career all in one space!
            </Typography>
        </Container> */}