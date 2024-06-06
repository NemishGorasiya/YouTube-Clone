import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const LayoutComponent = styled(MuiBox)({
	display: "flex",
});

export const RightPanel = styled(MuiBox)(({ theme }) => ({
	flexGrow: 1,
	padding: "0 26px",
	minWidth: 0,
	background: theme.palette.background.default,
	[theme.breakpoints.down("sm")]: {
		padding: "0 16px",
	},
}));

export const OutletWrapper = styled(MuiBox)({
	paddingTop: "8px",
});

export const DrawerHeader = styled("div")(({ theme }) => ({
	...theme.mixins.toolbar,
	height: "56px",
	"@media (min-width: 600px)": {
		minHeight: "56px",
	},
}));
