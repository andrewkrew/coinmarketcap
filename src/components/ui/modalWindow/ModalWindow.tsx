import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainBtn } from '../mainBtn';
import styles from './styles.module.css'

export const ModalWindow = 
	({btnValue, type, children} 
		: {btnValue: string | JSX.Element, type: 'add' | 'info', children: JSX.Element}
	) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
			<Box onClick={handleOpen}>
				<MainBtn>{btnValue}</MainBtn>
			</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
					<div className={type === 'add' ? styles.add : styles.info}>
						{children}
					</div>   
      </Modal>
    </>
  );
}