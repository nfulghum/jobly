import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CompanyCard = ({ name, description, logoUrl, handle, numEmployees }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea component={Link} to={`/companies/${handle}`}>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={logoUrl}
                            alt={name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {numEmployees}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </ThemeProvider>
    )
}

export default CompanyCard;
