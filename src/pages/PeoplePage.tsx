import React, { useEffect, useState } from 'react';
import { getPersonById } from '../api/people/service';
import { getFilmsById } from '../api/films/service';
import { Paper, Typography, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';

interface Person {
    name: string;
    birth_year: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    films: string[];
}

interface Film {
    title: string;
    episode_id: number;
    release_date: string;
    director: string, 
    producer: string, 
}

const PeoplePage: React.FC = () => {
    const [data, setData] = useState<Person | null>(null);
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const person = await getPersonById(Number(id));
                setData(person);

                const filmIds = person.films.map((filmUrl: string) =>
                    parseInt(filmUrl.split('/').filter(Boolean).pop() || '0')
                );
                const fetchedFilms = await Promise.all(
                    filmIds.map((filmId: number) => getFilmsById(filmId))
                );
                setFilms(fetchedFilms);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Typography variant="h4">Loading...</Typography>;
    }

    if (!data) {
        return <Typography variant="h4">No data found.</Typography>;
    }

    return (
        <Paper
            elevation={4}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '20px',
            }}
        >
            <Typography variant="h2">{data.name}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Birth Year: {data.birth_year}
            </Typography>
            <Typography variant="h6">
                Mass: {data.mass}, Height: {data.height}
            </Typography>
            <Typography variant="body1">Hair Color: {data.hair_color}</Typography>
            <Typography variant="body1">Eye color: {data.eye_color}</Typography>
            <Typography variant="body1">Skin Color: {data.skin_color}</Typography>

            <Typography variant="h4" sx={{ marginTop: '20px' }}>
                Films:
            </Typography>
            <List>
                {films.map((film) => (
                    <ListItem key={film.episode_id} sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h5">
                            <strong>{film.title}</strong> ({film.release_date})
                        </Typography>
                        <Typography variant="body1">
                            <strong>Director:</strong> {film.director}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Producer:</strong> {film.producer}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PeoplePage;
