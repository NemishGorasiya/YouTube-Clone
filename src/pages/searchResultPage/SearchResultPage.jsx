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
        url={`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=${searchQuery}&type=video&videoDefinition=high`}
      />
    </div>
  );
};

export default SearchResultPage;
