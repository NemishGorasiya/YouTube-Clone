import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoFilter from "./VideoFilter";
import VideoGallery from "../../components/VideoGallery";
import { VideoFilterButtonWrapper } from "./SearchResultPageStyledComponents";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  const [queryParams, setQueryParams] = useState({
    part: "snippet",
    maxResults: 10,
    q: searchQuery,
    type: "video",
  });

  const updateQueryParams = ({ key, value, isRemoving = false }) => {
    setQueryParams((prevParams) => {
      if (isRemoving) {
        const newParams = { ...prevParams };
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
