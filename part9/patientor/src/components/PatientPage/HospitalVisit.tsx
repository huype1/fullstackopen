import { HospitalEntry } from '../../types.ts';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box } from '@mui/material';

const HospitalVisit = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box component="section"sx={{ p: 1, m: 2, border: '2px solid gray', borderRadius: 2 }}>
      <h3>{entry.date} <LocalHospitalIcon /></h3>
      <p>{entry.description}</p>
      <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>

      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};
export default HospitalVisit;