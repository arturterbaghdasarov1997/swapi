import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface Person {
    name: string;
    birth_year: string;
    gender: string;
}

interface CharacterCardsProps {
    data: Person[];
    loading: boolean;
    currentPage: number;
}

export const CharacterCards: React.FC<CharacterCardsProps> = ({ data, loading, currentPage }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
        }}
    >
        {loading ? (
            <Typography variant="h4">Loading...</Typography>
        ) : (
            data.map(({ name, birth_year, gender }, index) => (
                <Card
                    key={index}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid #1976d2',
                        borderRadius: '10px',
                        padding: '15px',
                        width: '250px',
                        textAlign: 'center',
                        boxShadow: 3,
                    }}
                >
                    <Link
                        to={`${index + 1 + (currentPage - 1) * 10}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Typography variant="h5">{name}</Typography>
                        <Typography variant="body1">Birth Year: {birth_year}</Typography>
                        <Typography variant="body1">Gender: {gender}</Typography>
                    </Link>
                </Card>
            ))
        )}
    </Box>
);
