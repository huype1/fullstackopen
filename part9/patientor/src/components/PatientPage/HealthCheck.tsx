import { HealthCheckEntry, HealthCheckRating } from '../../types.ts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const ratingColorMap: { [key in HealthCheckRating]: string } = {
    [HealthCheckRating.Healthy]: 'green',
    [HealthCheckRating.LowRisk]: 'yellow',
    [HealthCheckRating.HighRisk]: 'orange',
    [HealthCheckRating.CriticalRisk]: 'red',
  };

  return (
    <Box component="section"sx={{ p: 1, m: 2, border: '2px solid gray', borderRadius: 2 }}>
      <h3>{entry.date} <MedicalServicesIcon /></h3>
      <p>{entry.description}</p>
      <FavoriteIcon style={{ color: ratingColorMap[entry.healthCheckRating] }} />

      <p>diagnosed by {entry.specialist}</p>
    </Box>
  );
};

export default HealthCheck;