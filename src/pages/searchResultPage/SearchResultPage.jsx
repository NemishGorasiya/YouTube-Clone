import { useSearchParams } from "react-router-dom";
import VideoGallery from "../../components/VideoGallery";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  return (
    <div>
      <VideoGallery
        isListView={true}
        url="/search"
        queryParams={{
          part: "snippet",
          maxResults: 10,
          q: searchQuery,
          type: "video",
          videoDefinition: "high",
        }}
      />
    </div>
  );
};

export default SearchResultPage;
