import { useSearchParams } from "react-router-dom";
import VideoGallery from "../../components/VideoGallery";
import VideoFilter from "./VideoFilter";
import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import { useEffect, useState } from "react";

const VideoFilterButtonWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
}));

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  const [queryParams, setQueryParams] = useState({
    part: "snippet",
    maxResults: 10,
    q: searchQuery,
    type: "video",
    videoDefinition: "high",
  });

  const updateQueryParams = ({ key, value, isRemoving = false }) => {
    setQueryParams((prevParams) => {
      if (isRemoving) {
        // Create a copy of prevParams to avoid direct mutation
        const newParams = { ...prevParams };
        // Use the delete operator to remove the key-value pair
        delete newParams[key];
        return newParams;
      } else {
        return {
          ...prevParams,
          [key]: value,
        };
      }
    });
  };

  useEffect(() => {
    updateQueryParams({ key: "q", value: searchQuery });
  }, [searchQuery]);

  console.log("filters in search page", queryParams);

  return (
    <div>
      <VideoFilterButtonWrapper>
        <VideoFilter
          updateQueryParams={updateQueryParams}
          queryParams={queryParams}
        />
      </VideoFilterButtonWrapper>
      <VideoGallery isListView={true} url="/search" queryParams={queryParams} />
    </div>
  );
};

export default SearchResultPage;
