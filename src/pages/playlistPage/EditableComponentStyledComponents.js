import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiTextField from "@mui/material/TextField";

export const EditableContentWrapper = styled(MuiBox)(({ isEditMode }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	...(isEditMode
		? {
				flexDirection: "column",
		  }
		: {}),
}));

export const UserActionButtonsWrapper = styled(MuiBox)({
	textAlign: "end",
	width: "100%",
});

export const TextField = styled(MuiTextField)({
	width: "100%",
	"& .MuiInputBase-input": {
		color: "#FFFFFF",
		fontSize: 32,
		fontWeight: 700,
	},
});
