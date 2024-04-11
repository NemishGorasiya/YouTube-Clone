import TextField from "@mui/material/TextField";
import MuiTextField from "@mui/material/TextField";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import MuiInputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MuiBox from "@mui/material/Box";
import MuiInputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./SearchInput.scss";

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
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    border: `1px solid ${theme.palette.primary.main}`,
    borderLeft: "none",
    borderRadius: "0 40px 40px 0",
  }));

  const InputAdornment = styled(MuiInputAdornment)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  // const Form = styled("form")({
  //   display: "flex",
  //   alignItems: "center",
  //   height: "40px",
  // });

  const searchIconAdornment = searchInputIsFocused ? (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  ) : (
    <></>
  );

  return (
    <>
      <form onSubmit={handleSearch} className="searchForm">
        <InputBase
          value={searchQuery}
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
