import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import { getPeople } from '../api/people/service';
import { Link } from 'react-router-dom';

interface Person {
    name: string;
    birth_year: string;
    gender: string;
}

const HomePage: React.FC = () => {
    const [data, setData] = useState<Person[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getPeople(currentPage);
                setData(response.results);
                setTotalPages(Math.ceil(response.count / 10));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '10px',
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
                                border: '1px solid blue',
                                borderRadius: '15px',
                                padding: '10px',
                                width: '200px',
                                alignItems: 'center',
                            }}
                        >
                            <Link to={`${index + 1 + (currentPage - 1) * 10}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h5">{name}</Typography>
                                <Typography variant="body1">Birth Year: {birth_year}</Typography>
                                <Typography variant="body1">Gender: {gender}</Typography>
                            </Link>
                        </Card>
                    ))
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    sx={{ marginRight: '10px' }}
                >
                    Previous
                </Button>
                <Typography variant="body1" sx={{ alignSelf: 'center', marginX: '10px' }}>
                    Page {currentPage} of {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
