import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/useRedux';
import { snackbarSelector } from '../../../redux/selectors';
import { hideMessage } from '../../../redux';

export const SnackbarSuccess = () => {
  
	const {isOpen, message} = useAppSelector(snackbarSelector);
	const dispatch = useAppDispatch();

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
		dispatch(hideMessage());
  };

  return (
		<Snackbar 
			open={isOpen} 
			autoHideDuration={3000} 
			onClose={handleClose} 
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					{message}
				</Alert>
		</Snackbar>
  );
}