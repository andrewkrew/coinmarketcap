import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../../shared/hooks/useRedux';
import { removeAllTransactions, removeTransaction, showMessage } from '../../../redux';
import { Box } from '@mui/material';
import { SecondaryBtn } from '../secondaryBtn';

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
			dispatch(showMessage('All transactions deleted seccessfuly!'))
		} else if (idTsx) {
			dispatch(removeTransaction(idTsx));
			dispatch(showMessage('Transaction deleted seccessfuly!'))
		}
	}

  return (
    <>
			<Box onClick={handleClickOpen}>
				<SecondaryBtn>{btnValue}</SecondaryBtn>
			</Box>
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
					<Box onClick={handleClose}>
						<SecondaryBtn>Disagree</SecondaryBtn>
					</Box>
					<Box onClick={agreeDelete}>
						<SecondaryBtn>Agree</SecondaryBtn>
					</Box>
        </DialogActions>
      </Dialog>
    </>
  );
}