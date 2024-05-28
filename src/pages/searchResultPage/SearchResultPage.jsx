import { useSearchParams } from "react-router-dom";
import VideoGallery from "../../components/VideoGallery";
import VideoFilter from "./VideoFilter";
import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";

const VideoFilterButtonWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
}));

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  return (
    <div>
      <VideoFilterButtonWrapper>
        <VideoFilter />
      </VideoFilterButtonWrapper>
      {/* <VideoGallery
        isListView={true}
        url="/search"
        queryParams={{
          part: "snippet",
          maxResults: 10,
          q: searchQuery,
          type: "video",
          videoDefinition: "high",
        }}
      /> */}
    </div>
  );
};

export default SearchResultPage;
