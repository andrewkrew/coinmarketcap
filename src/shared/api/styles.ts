import { orange } from "@mui/material/colors";

export const inputStyle = {
	'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: orange[700],
	},
	'& .MuiOutlinedInput-root-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: orange[700],
	},
	'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: orange[700],
	},
	'& .MuiOutlinedInput-root-focused:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: orange[700],
	},
	'& .MuiInputLabel-root.Mui-focused': {
		color: orange[700],
	},
	'& .MuiOutlinedInput-notchedOutline' : {
		borderColor: 'inherit',
	},
	'& .MuiOutlinedInput-root': {
		color: 'inherit',
	},
	'& .MuiInputLabel-root' : {
		color: 'inherit',
	}
}

export const paginationStyle = {
	'& .MuiPaginationItem-root': {
		borderColor: 'inherit',
		color: 'inherit',
	},

	'& .MuiPaginationItem-root.Mui-selected' : {
		color: orange[700],
		backgroundColor: orange[100],
	}
}