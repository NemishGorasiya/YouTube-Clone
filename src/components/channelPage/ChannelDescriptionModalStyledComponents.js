import { IconButton, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";

export const DescriptionItem = styled(MuiTypography)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: "16px",
	color: theme.palette.primary.main,
	"& .MuiSvgIcon-root": {
		fontSize: "26px",
	},
}));

export const DescriptionItemsWrapper = styled(MuiBox)({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
});

export const CloseModalButton = styled(IconButton)({
	position: "absolute",
	right: 5,
	top: 5,
});

export const ChannelDescription = styled(MuiTypography)(({ theme }) => ({
	fontSize: "15px",
	color: theme.palette.primary.main,
}));

export const ModalContent = styled(MuiBox)({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
});
