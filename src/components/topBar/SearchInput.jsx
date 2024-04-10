import TextField from "@mui/material/TextField";
import MuiTextField from "@mui/material/TextField";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MuiBox from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/results?search_query=${searchQuery}`);
  };

  const SearchIconWrapper = styled("div")(() => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    border: "1px solid #000",
    borderLeft: "none",
    borderRadius: "0 40px 40px 0",
  }));

  const searchIconAdornment = searchInputIsFocused ? (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  ) : (
    <></>
  );

  return (
    <>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", height: "40px" }}
      >
        <InputBase
          sx={{
            border: "1px solid #000",
            height: "100%",
            borderRadius: "40px 0 0 40px",
            paddingLeft: "10px",
          }}
          value={searchQuery}
          onFocus={() => {
            console.log("called");
            setSearchInputIsFocused(true);
          }}
          onBlur={() => {
            console.log("blur called");
            setSearchInputIsFocused(false);
          }}
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
