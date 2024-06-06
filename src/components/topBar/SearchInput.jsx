import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import VoiceSearch from "./VoiceSearch";
import {
  InputAdornment,
  SearchIconWrapper,
  SearchInputContainer,
  formStyle,
} from "./SearchInputStyledComponents";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);

  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangeInSearchQuery = (value) => {
    setSearchQuery(value);
  };

  const searchVideos = (queryToSearch) => {
    if (queryToSearch === "") {
      return;
    }
    navigate(`/results?search_query=${queryToSearch}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchVideos(searchQuery);
  };

  const searchIconAdornment = searchInputIsFocused ? (
    <InputAdornment>
      <SearchIcon />
    </InputAdornment>
  ) : (
    <></>
  );

  return (
    <SearchInputContainer isSmallScreen={isSmallScreen}>
      <form
        style={{
          ...formStyle,
          ...(searchInputIsFocused && isSmallScreen
            ? {
                position: "fixed",
                minWidth: "100vw",
                background: "#000",
                backgroundColor: "#000",
                zIndex: "99",
                left: "0",
                paddingLeft: "66px",
                paddingRight: "43px",
                marginLeft: 0,
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
          onChange={(event) => {
            handleChangeInSearchQuery(event.target.value);
          }}
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
      <VoiceSearch
        handleChangeInSearchQuery={handleChangeInSearchQuery}
        searchVideos={searchVideos}
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
