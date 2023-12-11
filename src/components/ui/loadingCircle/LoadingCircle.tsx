import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const LoadingCircle = () => {
  return (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress sx={{
          color: () => '#ff9800'
        }}/>
    </Box>
  );
}