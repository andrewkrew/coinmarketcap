import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/useRedux';
import { removeAllTransactions, removeTransaction, showMessage } from '../../../redux';
import { Box } from '@mui/material';
import { SecondaryBtn } from '../secondaryBtn';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { authSelector, portfolioDataSelector } from '../../../redux/selectors';

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
	const {id} = useAppSelector(authSelector);
	const {transactions} = useAppSelector(portfolioDataSelector);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const agreeDelete = async () => {
		handleClose();
		const coinRef = doc(db, "transactions", id);
		if (removeType === 'all' && idToken) {
			dispatch(removeAllTransactions(idToken));
			dispatch(showMessage('All transactions deleted seccessfuly!'));
			await setDoc(
        coinRef,
        { transactions: transactions.filter((item) => item.tokenId !== idToken)},
        { merge: true }
      );
		} else if (idTsx) {
			dispatch(removeTransaction(idTsx));
			dispatch(showMessage('Transaction deleted seccessfuly!'));
			await setDoc(
        coinRef,
        { transactions: transactions.filter((item) => item.id !== idTsx) },
        { merge: true }
      );
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