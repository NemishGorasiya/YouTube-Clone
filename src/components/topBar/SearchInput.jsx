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

  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const searchButtonRef = useRef(null);

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
    event.preventDefault();
    event.stopPropagation();
    searchVideos(searchQuery);
    searchInputRef?.current?.focus();
  };

  const openSearchInput = () => {
    setSearchInputIsFocused(true);
    searchInputRef?.current?.focus();
  };

  const handleBlur = (event) => {
    if (
      searchButtonRef.current &&
      searchButtonRef.current.contains(event.relatedTarget)
    ) {
      event.preventDefault();
      return;
    }
    setSearchInputIsFocused(false);
  };

  const handleFocus = () => {
    setSearchInputIsFocused(true);
    searchInputRef?.current?.focus();
  };

  const searchIconAdornment = (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );

  useEffect(() => {
    if (searchInputIsFocused) {
      searchInputRef?.current?.focus();
    }
  }, [searchInputIsFocused]);

  return (
    <SearchInputContainer
      $isSmallScreen={isSmallScreen}
      $searchInputIsFocused={searchInputIsFocused}
      onBlur={handleBlur}
      onFocus={handleFocus}
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
