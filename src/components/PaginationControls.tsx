import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
}) => (
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
);
