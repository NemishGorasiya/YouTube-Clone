import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import VoiceSearch from "./VoiceSearch";
import {
  InputAdornment,
  OpenSearchInputButton,
  SearchIconWrapper,
  SearchInputContainer,
  StyledForm,
  StyledInputBase,
} from "./SearchInputStyledComponents";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);

  const searchInputRef = useRef(null);
  const searchButtonRef = useRef(null);

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchVideos = (queryToSearch) => {
    if (queryToSearch === "") {
      return;
    }
    navigate(`/results?search_query=${queryToSearch}`);
  };

  const handleSearchSubmit = (event) => {
    console.log("submit called");
    event.preventDefault();
    event.stopPropagation();
    searchVideos(searchQuery);
    if (searchInputRef.current) {
      console.log("focus hua");
      searchInputRef.current.focus();
    }
  };

  const handleInputBlur = (event) => {
    if (
      searchButtonRef.current &&
      searchButtonRef.current.contains(event.relatedTarget)
    ) {
      event.preventDefault();
      return;
    }
    setSearchInputIsFocused(false);
  };

  const openSearchInput = () => {
    setSearchInputIsFocused(true);
    if (searchInputRef.current) {
      console.log("focus");
      console.log("ef", searchInputRef.current);
      searchInputRef.current.focus();
    }
  };

  const searchIconAdornment = (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );

  useEffect(() => {
    if (searchInputIsFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputIsFocused]);

  return (
    <SearchInputContainer
      $isSmallScreen={isSmallScreen}
      $searchInputIsFocused={searchInputIsFocused}
    >
      <StyledForm
        onSubmit={handleSearchSubmit}
        $isSmallScreen={isSmallScreen}
        $searchInputIsFocused={searchInputIsFocused}
      >
        <StyledInputBase
          inputRef={searchInputRef}
          value={searchQuery}
          type="search"
          placeholder="Search"
          onChange={handleSearchQueryChange}
          startAdornment={searchIconAdornment}
          $isSmallScreen={isSmallScreen}
          $searchInputIsFocused={searchInputIsFocused}
          onFocus={() => setSearchInputIsFocused(true)}
          onBlur={handleInputBlur}
        />
        <SearchIconWrapper
          ref={searchButtonRef}
          $isSmallScreen={isSmallScreen}
          $searchInputIsFocused={searchInputIsFocused}
        >
          <SearchIcon />
        </SearchIconWrapper>
      </StyledForm>
      <>
        {isSmallScreen && !searchInputIsFocused && (
          <OpenSearchInputButton>
            <SearchIcon onClick={openSearchInput} />
          </OpenSearchInputButton>
        )}
        {(!isSmallScreen || searchInputIsFocused) && (
          <VoiceSearch
            handleSearchQueryChange={handleSearchQueryChange}
            searchVideos={searchVideos}
          />
        )}
      </>
    </SearchInputContainer>
  );
};

export default SearchInput;
