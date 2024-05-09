import VideoGallery from "../../components/VideoGallery.jsx";

const HomePage = () => {
  return (
    <div>
      <VideoGallery
        url="/videos"
        queryParams={{
          part: "snippet,statistics",
          chart: "mostPopular",
          maxResults: 10,
        }}
      />
    </div>
  );
};

export default HomePage;
