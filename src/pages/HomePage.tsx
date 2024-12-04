import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { getPeople } from '../api/people/service';
import NavBar from '../components/NavBar';
import { CharacterCards } from '../components/CharacterCards';
import { PaginationControls } from '../components/PaginationControls';

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
            <NavBar />
            <Box sx={{ padding: '20px' }}>
                <CharacterCards data={data} loading={loading} currentPage={currentPage} />
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </Box>
        </Box>
    );
};

export default HomePage;
