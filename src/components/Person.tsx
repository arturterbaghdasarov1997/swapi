import React from 'react';
import { Person } from '../interfaces/person/person.interface';
import { Typography } from '@mui/material';

interface PersonProps {
    person: Person;
}

const PersonComponent: React.FC<PersonProps> = ({ person }) => {
    return (
        <div>
            <Typography variant="h2">{person.name}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Birth Year: {person.birth_year}
            </Typography>
            <Typography variant="h6"><strong>Gender: </strong>{person.gender}</Typography>
            <Typography variant="body1">
                <strong>Mass: </strong>{person.mass}, <strong>Height: </strong>{person.height}
            </Typography>
            <Typography variant="body1"><strong>Hair Color: </strong>{person.hair_color}</Typography>
            <Typography variant="body1"><strong>Eye color: </strong>{person.eye_color}</Typography>
            <Typography variant="body1"><strong>Skin Color: </strong>{person.skin_color}</Typography>
        </div>
    );
};

export default PersonComponent;
