import { Box, styled } from "@mui/material";
import MuiInputAdornment from "@mui/material/InputAdornment";

const SEARCH_INPUT_HEIGHT = "40px";

export const SearchIconWrapper = styled("button")(
  ({ theme, isSmallScreen }) => ({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "55px",
    color: theme.palette.primary.main,
    border: `0.5px solid ${theme.palette.secondary.light}`,
    background: theme.palette.background.light,
    borderRadius: `0 ${SEARCH_INPUT_HEIGHT} ${SEARCH_INPUT_HEIGHT} 0`,
    marginLeft: "auto",
    cursor: "pointer",
    ...(isSmallScreen && {
      borderRadius: "50%",
      width: SEARCH_INPUT_HEIGHT,
      aspectRatio: "1/1",
      background: "transparent",
      border: "none",
    }),
  })
);

export const InputAdornment = styled(MuiInputAdornment)(({ theme }) => ({
  color: theme.palette.primary.main,
  position: "absolute",
  left: "0",
  transform: "translateX(-100%)",
  border: `1px solid ${theme.palette.secondary.light}`,
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

export const SearchInputContainer = styled(Box)(({ isSmallScreen }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  ...(isSmallScreen && {
    marginLeft: "auto",
  }),
}));

export const formStyle = {
  display: "flex",
  alignItems: "center",
  height: SEARCH_INPUT_HEIGHT,
  maxWidth: "550px",
  marginLeft: "52px",
  flex: "1",
};
