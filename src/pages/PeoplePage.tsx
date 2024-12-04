import React, { useEffect, useState } from 'react';
import { getPersonById } from '../api/people/service';
import { getFilmsById } from '../api/films/service';
import { Box, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getHomeworldById } from '../api/homeworld/service';
import NavBar from '../components/NavBar';
import { Person } from '../interfaces/person/person.interface';
import { Film } from '../interfaces/film/film.interface';
import { Homeworld } from '../interfaces/homeworld/homeworld.interface';
import PersonComponent from '../components/Person';
import HomeworldComponent from '../components/Homeworld';
import FilmComponent from '../components/Film';

const PeoplePage: React.FC = () => {
    const [data, setData] = useState<Person | null>(null);
    const [films, setFilms] = useState<Film[]>([]);
    const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const person = await getPersonById(Number(id));
                setData(person);

                // Fetch films
                const filmIds = person.films.map((filmUrl: string) =>
                    parseInt(filmUrl.split('/').filter(Boolean).pop() || '0')
                );
                const fetchedFilms = await Promise.all(
                    filmIds.map((filmId: number) => getFilmsById(filmId))
                );
                setFilms(fetchedFilms);

                // Fetch homeworld
                const homeworldId = parseInt(
                    person.homeworld.split('/').filter(Boolean).pop() || '0'
                );
                const fetchedHomeworld = await getHomeworldById(homeworldId);
                setHomeworld(fetchedHomeworld);
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
        <Box>
            <NavBar />
            <Paper
                elevation={4}
                sx={{
                    marginTop: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '20px',
                }}
            >
                <PersonComponent person={data} />
                <HomeworldComponent homeworld={homeworld} />
                <FilmComponent films={films} />
            </Paper>
        </Box>
    );
};

export default PeoplePage;
