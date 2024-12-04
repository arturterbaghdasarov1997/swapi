import React from 'react';
import { Homeworld } from '../interfaces/homeworld/homeworld.interface';
import { Typography, List, ListItem } from '@mui/material';

interface HomeworldProps {
    homeworld: Homeworld | null;
}

const HomeworldComponent: React.FC<HomeworldProps> = ({ homeworld }) => {
    if (!homeworld) return <Typography>No Homeworld Data Available</Typography>;

    return (
        <div>
            <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                Homeworld:
            </Typography>
            <List>
                <ListItem sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <Typography variant="h4">
                        <strong>{homeworld.name} (Population: {homeworld.population})</strong>
                    </Typography>
                    <Typography variant="h5" sx={{ marginTop: '10px' }}>
                        <strong>Rotation Period:</strong> {homeworld.rotation_period}<br />
                        <strong>Diameter:</strong> {homeworld.diameter}<br />
                        <strong>Terrain:</strong> {homeworld.terrain}<br />
                        <strong>Surface Water:</strong> {homeworld.surface_water}
                    </Typography>
                </ListItem>
            </List>
        </div>
    );
};

export default HomeworldComponent;
