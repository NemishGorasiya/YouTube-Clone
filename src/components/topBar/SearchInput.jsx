import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import VoiceSearch from "./VoiceSearch";
import {
  InputAdornment,
  SearchIconWrapper,
  SearchInputContainer,
  StyledForm,
  StyledInputBase,
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
    <SearchInputContainer $isSmallScreen={isSmallScreen}>
      <StyledForm
        onSubmit={handleSearch}
        $isSmallScreen={isSmallScreen}
        $searchInputIsFocused={searchInputIsFocused}
      >
        <StyledInputBase
          inputRef={searchInputRef}
          value={searchQuery}
          type="search"
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
          $isSmallScreen={isSmallScreen}
          $searchInputIsFocused={searchInputIsFocused}
        />
        {(!isSmallScreen || !searchInputIsFocused) && (
          <SearchIconWrapper
            type={isSmallScreen && !searchInputIsFocused ? "button" : "submit"}
            $isSmallScreen={isSmallScreen}
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
      </StyledForm>
      <VoiceSearch
        handleChangeInSearchQuery={handleChangeInSearchQuery}
        searchVideos={searchVideos}
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
