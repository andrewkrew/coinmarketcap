import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import { orange } from "@mui/material/colors";

const SecondaryBtnStyle = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "transparent",
  '&:hover': {
    backgroundColor: "transparent",
		color: orange[500],
  },
	'& a': {
		color: 'inherit',
	}
}));

export const SecondaryBtn = ({children} : {children: JSX.Element | string}) => {
	return (
		<SecondaryBtnStyle variant='outlined' color="inherit">
			{children}
		</SecondaryBtnStyle>
	)
}