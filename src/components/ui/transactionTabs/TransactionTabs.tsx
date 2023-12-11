import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Dispatch, SyntheticEvent} from 'react';
import { orange } from '@mui/material/colors';

export const TransactionTabs = (
		{operation, setOperation}: 
		{operation:number, setOperation: Dispatch<React.SetStateAction<number>>}
	) => {

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setOperation(newValue);
  };

	const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
					textColor='inherit' 
					value={operation} 
					onChange={handleChange} 
					aria-label="basic tabs example"
					sx={{
						color: orange[700],
						'& .MuiTabs-indicator': {
							backgroundColor: orange[700],
						}
					}}>
						<Tab color='inherit' sx={{ width: '50%' }} label="Buy" {...a11yProps(0)} />
						<Tab color='inherit' sx={{ width: '50%' }} label="Sell" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
}
