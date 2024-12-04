import { AppBar, Button, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isOnPeoplePage = /\/\w+/.test(location.pathname);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
                {isOnPeoplePage && (
                    <Button startIcon={<ArrowBackIcon />} color="inherit" onClick={handleBack}>
                        
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
