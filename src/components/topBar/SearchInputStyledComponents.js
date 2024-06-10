import styledConfig from "../../utils/styledConfig";
import { Box, InputBase } from "@mui/material";
import MuiInputAdornment from "@mui/material/InputAdornment";
import crossImage from "../../assets/cross.png";

const SEARCH_INPUT_HEIGHT = "40px";

export const SearchIconWrapper = styledConfig("button")(
	({ theme, $isSmallScreen }) => ({
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "55px",
		color: theme.palette.primary.main,
		border: `0.5px solid ${theme.palette.background.light}`,
		background: theme.palette.background.light,
		borderRadius: `0 ${SEARCH_INPUT_HEIGHT} ${SEARCH_INPUT_HEIGHT} 0`,
		marginLeft: "auto",
		cursor: "pointer",
		...($isSmallScreen && {
			borderRadius: "50%",
			width: SEARCH_INPUT_HEIGHT,
			aspectRatio: "1/1",
			background: "transparent",
			border: "none",
		}),
	})
);

export const InputAdornment = styledConfig(MuiInputAdornment)(({ theme }) => ({
	color: theme.palette.primary.main,
	position: "absolute",
	left: "0",
	transform: "translateX(-100%)",
	border: `1px solid #5475c4f7`,
	minHeight: SEARCH_INPUT_HEIGHT,
	width: SEARCH_INPUT_HEIGHT,
	borderRight: "none",
	borderTopLeftRadius: SEARCH_INPUT_HEIGHT,
	borderBottomLeftRadius: SEARCH_INPUT_HEIGHT,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	paddingLeft: "10px",
}));

export const SearchInputContainer = styledConfig(Box)(({ $isSmallScreen }) => ({
	display: "flex",
	alignItems: "center",
	gap: "8px",
	...($isSmallScreen && {
		marginLeft: "auto",
	}),
}));

export const StyledForm = styledConfig("form")(
	({ theme, $searchInputIsFocused, $isSmallScreen }) => ({
		display: "flex",
		alignItems: "center",
		height: SEARCH_INPUT_HEIGHT,
		maxWidth: "550px",
		marginLeft: "52px",
		flex: "1",
		...($searchInputIsFocused && $isSmallScreen
			? {
					position: "fixed",
					minWidth: "100vw",
					background: theme.palette.background.default,
					zIndex: "99",
					left: "0",
					paddingLeft: "66px",
					paddingRight: "43px",
					marginLeft: 0,
					"@media (max-width: 600px)": {
						paddingLeft: "56px",
						paddingRight: "33px",
					},
			  }
			: {}),

		...($isSmallScreen && {
			marginLeft: 0,
		}),
	})
);

export const StyledInputBase = styledConfig(InputBase)(
	({ theme, $searchInputIsFocused, $isSmallScreen }) => ({
		height: "100%",
		width: "100%",
		border: `1px solid ${theme.palette.background.light}`,
		...($searchInputIsFocused
			? {
					borderLeft: "none",
					paddingLeft: "11px",
					borderColor: "#5475c4f7",
			  }
			: {
					borderRadius: "40px 0 0 40px",
					paddingLeft: "10px",
			  }),
		...($isSmallScreen &&
			($searchInputIsFocused
				? {
						borderRight: `1px solid #5475c4f7`,
						borderTopRightRadius: "40px",
						borderBottomRightRadius: "40px",
				  }
				: { opacity: 0, width: 0 })),
		"& input[type='search']::-webkit-search-cancel-button": {
			WebkitAppearance: "none",
			height: "15px",
			width: "15px",
			background: `url(${crossImage})`,
			backgroundSize: "cover",
			position: "absolute",
			right: "8px",
			top: "50%",
			transform: "translateY(-50%)",
			cursor: "pointer",
			...($isSmallScreen && {
				right: "12px",
			}),
		},
		"& input[type='search']": {
			paddingRight: "32px",
		},
	})
);
