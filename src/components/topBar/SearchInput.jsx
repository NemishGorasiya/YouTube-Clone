import SearchIcon from "@mui/icons-material/Search";
import MuiInputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SEARCH_INPUT_HEIGHT = "40px";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/results?search_query=${searchQuery}`);
  };

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    border: `0.5px solid #fff`,
    background: theme.palette.background.light,
    borderRadius: "0 40px 40px 0",
  }));

  const InputAdornment = styled(MuiInputAdornment)(({ theme }) => ({
    color: theme.palette.primary.main,
    position: "absolute",
    left: "0",
    transform: "translateX(-100%)",
    border: "1px solid #fff",
    minHeight: SEARCH_INPUT_HEIGHT,
    width: "40px",
    borderRight: "none",
    borderTopLeftRadius: "40px",
    borderBottomLeftRadius: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
          display: "flex",
          alignItems: "center",
          height: SEARCH_INPUT_HEIGHT,
        }}
        onSubmit={handleSearch}
        className="searchForm"
      >
        <InputBase
          value={searchQuery}
          sx={{
            height: "100%",
            border: "1px solid #fff",
            ...(searchInputIsFocused
              ? {
                  borderLeft: "none",
                }
              : {
                  borderTopLeftRadius: "40px",
                  borderBottomLeftRadius: "40px",
                }),
          }}
          onFocus={() => {
            setSearchInputIsFocused(true);
          }}
          onBlur={() => {
            setSearchInputIsFocused(false);
          }}
          className={`searchInput ${
            theme.palette.mode === "dark" ? "darkMode" : ""
          }`}
          placeholder="Search"
          onChange={handleSearchQueryChange}
          startAdornment={searchIconAdornment}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </form>
    </>
  );
};

export default SearchInput;
