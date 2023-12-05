import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../../shared/hooks/useRedux';
import { removeAllTransactions, removeTransaction } from '../../../redux';

interface Props {
	children: string,
	btnValue: string | JSX.Element,
	removeType: 'all' | 'id',
	idTsx?: number,
	idToken?: string,
}

export const ModalAlert = ({children, btnValue, removeType, idTsx, idToken}: Props) => {
  const [open, setOpen] = React.useState(false);
	const dispatch = useAppDispatch();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const agreeDelete = () => {
		handleClose();
		if (removeType === 'all' && idToken) {
			dispatch(removeAllTransactions(idToken));
		} else if (idTsx) {
			dispatch(removeTransaction(idTsx));
		}
	}

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {btnValue}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {children}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Disagree</Button>
          <Button onClick={agreeDelete}> Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}