import { useSearchParams } from "react-router-dom";
import VideoGallery from "../../components/VideoGallery";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  return (
    <div>
      <h1>Search results for {searchQuery}</h1>
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
