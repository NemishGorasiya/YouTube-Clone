import styledConfig from "../../utils/styledConfig";
import { Box, InputBase } from "@mui/material";
import MuiInputAdornment from "@mui/material/InputAdornment";
import crossImage from "../../assets/cross.png";

const SEARCH_INPUT_HEIGHT = "40px";

export const SearchIconWrapper = styledConfig("button")(({ theme }) => ({
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
}));

export const InputAdornment = styledConfig(MuiInputAdornment)(({ theme }) => ({
  color: theme.palette.primary.main,
  position: "absolute",
  left: "0",
  transform: "translateX(-100%)",
  border: `1px solid ${theme.palette.background.light}`,
  minHeight: SEARCH_INPUT_HEIGHT,
  width: SEARCH_INPUT_HEIGHT,
  borderRight: "none",
  borderTopLeftRadius: SEARCH_INPUT_HEIGHT,
  borderBottomLeftRadius: SEARCH_INPUT_HEIGHT,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SearchInputContainer = styledConfig(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down("md")]: {
    display: "none",
    "&.visible": {
      display: "flex",
      position: "fixed",
      background: theme.palette.background.default,
      width: "calc(100% - 52px)",
      zIndex: 99,
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 32px)",
      },
    },
  },
}));

export const StyledForm = styledConfig("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: SEARCH_INPUT_HEIGHT,
  maxWidth: "550px",
  "& .MuiInputBase-root:has(input[type='search']:focus)": {
    borderRadius: 0,
    border: "1px solid #5475c4f7",
    borderLeft: "none",
    paddingLeft: "9px",
  },
  "& .MuiInputBase-root .MuiInputAdornment-root": {
    display: "none",
  },

  "& .MuiInputBase-root:has(input[type='search']:focus) .MuiInputAdornment-root":
    {
      display: "flex",
      border: "1px solid #5475c4f7",
      borderRight: "none",
    },
  [theme.breakpoints.down("md")]: {
    flex: "1",
    maxWidth: "unset",
    "& .MuiInputBase-root .MuiInputAdornment-root": {
      display: "flex",
    },
    "& .MuiInputBase-root:has(input[type='search']:focus)": {
      paddingLeft: "8px",
    },
    "& .MuiInputBase-root": {
      borderLeft: "none",
      borderRadius: 0,
    },
  },
}));

export const StyledInputBase = styledConfig(InputBase)(({ theme }) => {
  return {
    height: "100%",
    width: "100%",
    border: `1px solid ${theme.palette.background.light}`,
    borderRadius: `${SEARCH_INPUT_HEIGHT} 0 0 ${SEARCH_INPUT_HEIGHT}`,
    paddingLeft: "8px",
    "& input[type='search']::-webkit-search-cancel-button": {
      WebkitAppearance: "none",
      height: "15px",
      width: "15px",
      background: `url(${crossImage})`,
      backgroundSize: "cover",
      filter: `invert(${theme.palette.mode === "light" ? 1 : 0})`,
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    "& input[type='search']": {
      paddingRight: "32px",
    },
  };
});

export const OpenSearchInputButton = styledConfig(Box)(({ theme }) => ({
  display: "none",
  height: SEARCH_INPUT_HEIGHT,
  aspectRatio: "1/1",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "5px",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    marginLeft: "auto",
    "&.hidden": {
      display: "none",
    },
  },
}));

export const CloseSearchInputButton = styledConfig(Box)(({ theme }) => ({
  paddingRight: SEARCH_INPUT_HEIGHT,
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));
