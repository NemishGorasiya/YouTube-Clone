import SearchIcon from "@mui/icons-material/Search";
import { TextField, useMediaQuery } from "@mui/material";
import MuiInputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme } from "@mui/material/styles";
import { width } from "@mui/system";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SEARCH_INPUT_HEIGHT = "40px";

const formStyle = {
  display: "flex",
  alignItems: "center",
  height: SEARCH_INPUT_HEIGHT,
  width: "600px",
};
const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery === "") {
      return;
    }
    navigate(`/results?search_query=${searchQuery}`);
  };

  const SearchIconWrapper = styled("button")(({ theme, isSmallScreen }) => ({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "55px",
    color: theme.palette.primary.main,
    border: `0.5px solid ${theme.palette.secondary.light}`,
    background: theme.palette.background.light,
    borderRadius: "0 40px 40px 0",
    marginLeft: "auto",
    cursor: "pointer",
    ...(isSmallScreen
      ? {
          borderRadius: "50%",
          width: "40px",
          aspectRatio: "1/1",
          background: "transparent",
          border: "none",
        }
      : {}),
  }));

  const InputAdornment = styled(MuiInputAdornment)(({ theme }) => ({
    color: theme.palette.primary.main,
    position: "absolute",
    left: "0",
    transform: "translateX(-100%)",
    border: `1px solid ${theme.palette.secondary.light}`,
    minHeight: SEARCH_INPUT_HEIGHT,
    width: "40px",
    borderRight: "none",
    borderTopLeftRadius: "40px",
    borderBottomLeftRadius: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "10px",
  }));

  const searchIconAdornment = searchInputIsFocused ? (
    <InputAdornment>
      <SearchIcon />
    </InputAdornment>
  ) : (
    <></>
  );

  return (
    <>
      <form
        style={{
          ...formStyle,
          ...(searchInputIsFocused && isSmallScreen
            ? {
                position: "fixed",
                width: "100vw",
                background: "#000",
                backgroundColor: "#000",
                zIndex: "99",
                left: "0",
                paddingLeft: "66px",
                paddingRight: "43px",
              }
            : {}),
        }}
        onSubmit={handleSearch}
      >
        <InputBase
          inputRef={searchInputRef}
          value={searchQuery}
          sx={{
            height: "100%",
            width: "100%",
            border: `1px solid ${theme.palette.secondary.light}`,
            borderRight: "none",
            ...(searchInputIsFocused
              ? {
                  borderLeft: "none",
                  paddingLeft: "11px",
                }
              : {
                  borderRadius: "40px 0 0 40px",
                  paddingLeft: "10px",
                }),
            ...(isSmallScreen &&
              (searchInputIsFocused
                ? {
                    borderRight: `1px solid ${theme.palette.secondary.light}`,
                    borderTopRightRadius: "40px",
                    borderBottomRightRadius: "40px",
                  }
                : { opacity: 0 })),
          }}
          onFocus={() => {
            setSearchInputIsFocused(true);
          }}
          onBlur={() => {
            setSearchInputIsFocused(false);
          }}
          placeholder="Search"
          onChange={handleSearchQueryChange}
          startAdornment={searchIconAdornment}
        />
        {(!isSmallScreen || !searchInputIsFocused) && (
          <SearchIconWrapper
            type={isSmallScreen && !searchInputIsFocused ? "button" : "submit"}
            isSmallScreen={isSmallScreen}
            onClick={(event) => {
              event.stopPropagation();
              setSearchInputIsFocused(true);
              if (searchInputRef.current) {
                searchInputRef.current.focus();
              }
            }}
          >
            <SearchIcon />
          </SearchIconWrapper>
        )}
      </form>
    </>
  );
};

export default SearchInput;
