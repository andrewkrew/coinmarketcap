import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import { orange } from "@mui/material/colors";

const MainBtnStyle = styled(Button)<ButtonProps>(() => ({
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[700],
  },
	'& a': {
		color: 'inherit',
	},
}));

export const MainBtn = ({children} : {children: JSX.Element | string}) => {
	return (
		<MainBtnStyle variant='contained' color="inherit" type="submit">
			{children}
		</MainBtnStyle>
	)
}