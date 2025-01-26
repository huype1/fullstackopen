import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from '../../types.ts';
import { Box } from '@mui/material';

const OccupationalHealthCare = ({ entry }: { entry: OccupationalHealthcareEntry}) => {
    return (
        <Box component="section"sx={{ p: 1, m: 2, border: '2px solid gray', borderRadius: 2 }}>
            <h3>{entry.date} <WorkIcon /> {entry.employerName}</h3>
            <p>{entry.description}</p>
            <p>diagnosed by {entry.specialist}</p>
        </Box>
    );
};
export default OccupationalHealthCare;