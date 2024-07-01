import styledConfig from "../../utils/styledConfig";
import { Box, InputBase } from "@mui/material";
import MuiInputAdornment from "@mui/material/InputAdornment";
import crossImage from "../../assets/cross.png";

const SEARCH_INPUT_HEIGHT = "40px";

export const SearchIconWrapper = styledConfig("button")(
  ({ theme, $isSmallScreen, $searchInputIsFocused }) => ({
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
    ...($isSmallScreen &&
      !$searchInputIsFocused && {
        display: "none",
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
}));

export const SearchInputContainer = styledConfig(Box)(
  ({ theme, $isSmallScreen, $searchInputIsFocused }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ...($isSmallScreen &&
      $searchInputIsFocused && {
        position: "fixed",
        width: "calc(100% - 52px)",
        background: theme.palette.background.default,
        zIndex: "99",
        margin: "auto",
        left: "26px",
        "@media (max-width: 600px)": {
          width: "calc(100% - 32px)",
          left: "16px",
        },
      }),
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
    },
  })
);

export const StyledForm = styledConfig("form")(
  ({ theme, $isSmallScreen, $searchInputIsFocused }) => ({
    display: "flex",
    alignItems: "center",
    height: SEARCH_INPUT_HEIGHT,
    maxWidth: "550px",
    flex: $isSmallScreen ? "1" : "unset",
    "& .MuiInputBase-root .MuiInputAdornment-root": {
      display: "none",
    },
    "& .MuiInputBase-root:has(input[type='search']:focus)": {
      marginLeft: $isSmallScreen ? "40px" : "0",
    },
    "& .MuiInputBase-root:has(input[type='search']:focus) .MuiInputAdornment-root":
      {
        display: "flex",
      },
    [theme.breakpoints.down("md")]: {
      maxWidth: "unset",
      "& .MuiInputBase-root .MuiInputAdornment-root": {
        display: "flex",
      },
    },
    ...($isSmallScreen && !$searchInputIsFocused && { display: "none" }),
  })
);

export const StyledInputBase = styledConfig(InputBase)(
  ({ theme, $searchInputIsFocused, $isSmallScreen }) => {
    return {
      height: "100%",
      width: "100%",
      border: `1px solid ${theme.palette.background.light}`,
      borderRadius: "40px 0 0 40px",
      paddingLeft: "0",
      ...($searchInputIsFocused
        ? {
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
            }
          : { opacity: 0, width: 0 })),
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
        ...($isSmallScreen && {
          right: "12px",
        }),
      },
      "& input[type='search']": {
        paddingRight: "32px",
      },
      "&:has(input[type='search']:focus)": {
        borderColor: "#5475c4f7",
        borderRadius: "0",
        borderLeft: "none",
        paddingLeft: "11px",
      },
      [theme.breakpoints.down("md")]: {
        borderRadius: "0",
        borderLeft: "none",
        paddingLeft: "12px",
      },
    };
  }
);

export const OpenSearchInputButton = styledConfig(Box)({
  height: "40px",
  aspectRatio: "1/1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "5px",
});
