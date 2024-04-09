import { useSearchParams } from "react-router-dom";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  return <div>{searchQuery}</div>;
};

export default SearchResultPage;
