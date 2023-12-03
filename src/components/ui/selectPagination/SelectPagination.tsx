import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction } from 'react';

export const SelectPagination = (
	{coinsQty, setCionsQty}
	: {coinsQty: string, setCionsQty: Dispatch<SetStateAction<string>>}
) => {

// export const SelectPagination = (
// 	{coinsQty}
// 	: {coinsQty: MutableRefObject<string>}
// ) => {

  const handleChange = (event: SelectChangeEvent) => {
    setCionsQty(event.target.value as string);
    // coinsQty.current = (event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={coinsQty}
          // value={coinsQty.current}
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