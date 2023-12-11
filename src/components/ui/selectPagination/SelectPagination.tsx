import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '../../../shared/hooks/useRedux';
import { setCoinsQnty, setExchangesQnty } from '../../../redux';
import { inputStyle } from '../../../shared/api/styles';

export const SelectPagination = (
	{coinsQty, type}
	: {coinsQty: string, type: 'coins' | 'exchanges'}
) => {

	const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    if (type === 'coins') {
			dispatch(setCoinsQnty(event.target.value as string));
		} else {
			dispatch(setExchangesQnty(event.target.value as string));
		}
  };

  return (
    <Box sx={{ minWidth: 100, ...inputStyle }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">{type}</InputLabel>
        <Select
					sx={{width: '100px'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={coinsQty}
          label="Coins in page"
          onChange={handleChange}
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}