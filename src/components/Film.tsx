import React from 'react';
import { Film } from '../interfaces/film/film.interface';
import { Typography, List, ListItem } from '@mui/material';

interface FilmProps {
    films: Film[];
}

const FilmComponent: React.FC<FilmProps> = ({ films }) => {
    return (
        <div>
            <Typography variant="h4" sx={{ marginTop: '20px' }}>
                Films:
            </Typography>
            <List>
                {films.map((film) => (
                    <ListItem key={film.episode_id} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5">
                            <strong>{film.title}</strong> ({film.release_date})
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                            <strong>Director:</strong> {film.director}<br />
                            <strong>Producer:</strong> {film.producer}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FilmComponent;
