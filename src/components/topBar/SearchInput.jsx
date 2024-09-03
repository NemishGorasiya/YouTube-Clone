import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import VoiceSearch from "./VoiceSearch";
import {
  CloseSearchInputButton,
  InputAdornment,
  OpenSearchInputButton,
  SearchIconWrapper,
  SearchInputContainer,
  StyledForm,
  StyledInputBase,
} from "./SearchInputStyledComponents";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const searchInputContainerRef = useRef(null);
  const openSearchInputBtnRef = useRef(null);

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
    searchInputContainerRef?.current?.classList.add("visible");
    openSearchInputBtnRef?.current?.classList.add("hidden");
    searchInputRef?.current?.focus();
  };

  const closeSearchInput = () => {
    searchInputContainerRef?.current?.classList.remove("visible");
    openSearchInputBtnRef?.current?.classList.remove("hidden");
  };

  const searchIconAdornment = (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );

  return (
    <>
      <SearchInputContainer ref={searchInputContainerRef}>
        <CloseSearchInputButton>
          <ArrowBackIcon onClick={closeSearchInput} />
        </CloseSearchInputButton>
        <StyledForm onSubmit={handleSearchSubmit}>
          <StyledInputBase
            inputRef={searchInputRef}
            value={searchQuery}
            type="search"
            placeholder="Search"
            onChange={handleSearchQueryChange}
            startAdornment={searchIconAdornment}
          />
          <SearchIconWrapper aria-label="search">
            <SearchIcon />
          </SearchIconWrapper>
        </StyledForm>
        <VoiceSearch
          handleSearchQueryChange={handleSearchQueryChange}
          searchVideos={searchVideos}
        />
      </SearchInputContainer>
      <OpenSearchInputButton ref={openSearchInputBtnRef}>
        <SearchIcon onClick={openSearchInput} />
      </OpenSearchInputButton>
    </>
  );
};

export default SearchInput;
