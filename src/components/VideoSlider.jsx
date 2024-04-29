import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import VideoCard from "./VideoCard";
import "./VideoSlider.scss";

const list = [
  {
    kind: "youtube#searchResult",
    etag: "nqygPz5ayitpwc6AaOmXu_iHICQ",
    id: {
      kind: "youtube#video",
      videoId: "5BLVw0gyfCQ",
    },
    snippet: {
      publishedAt: "2024-04-15T01:40:41Z",
      channelId: "UCRjTtUHdDFHf-vx2vyol1Fg",
      title:
        "Magic Egg Hunt Song In the Back Yard | Nursery Rhymes &amp; Animal Songs | SONG CLIPS",
      description:
        "Come along and sing the Surprise Magic Egg Song Where Are You Eggy Wawa with the magical surprise eggs the eggy wawas.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/5BLVw0gyfCQ/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/5BLVw0gyfCQ/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/5BLVw0gyfCQ/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "EggyWawa",
      liveBroadcastContent: "none",
      publishTime: "2024-04-15T01:40:41Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "J82FjPcZ6H79dreLDtgsvIkfXWs",
    id: {
      kind: "youtube#video",
      videoId: "t6Uedq4lugI",
    },
    snippet: {
      publishedAt: "2024-03-22T07:01:09Z",
      channelId: "UCRjTtUHdDFHf-vx2vyol1Fg",
      title:
        "Old MacDonald Had a Farm | Nursery Rhymes &amp; Animal Songs | Music For Preschool Kids | SONG CLIPS",
      description:
        "Come along and sing the Old MacDonald had a farm nursery rhyme song for kids, with the magical surprise eggy wawas, Sheldon ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/t6Uedq4lugI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/t6Uedq4lugI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/t6Uedq4lugI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "EggyWawa",
      liveBroadcastContent: "none",
      publishTime: "2024-03-22T07:01:09Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "aQeD9pUyGFM4ZlV5ovYuzxkAAPw",
    id: {
      kind: "youtube#playlist",
      playlistId: "PLlFYf733gHMY_CgmKizgGopHMI-FSCJAs",
    },
    snippet: {
      publishedAt: "2024-03-22T06:57:44Z",
      channelId: "UCRjTtUHdDFHf-vx2vyol1Fg",
      title: "Eggy Wawa Nursery Rhymes",
      description:
        "Sing along with Eggy Wawa, Sheldon, Max, FiFi and all their friend with all your favorite children's nursery rhymes. In this playlist ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/t6Uedq4lugI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/t6Uedq4lugI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/t6Uedq4lugI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "EggyWawa",
      liveBroadcastContent: "none",
      publishTime: "2024-03-22T06:57:44Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "xR68VOmE31Oh6536D4hhGuNm2NU",
    id: {
      kind: "youtube#video",
      videoId: "7oVYSbWyrlc",
    },
    snippet: {
      publishedAt: "2024-04-06T20:56:43Z",
      channelId: "UCRjTtUHdDFHf-vx2vyol1Fg",
      title:
        "Magic Egg Hunt Song At School | Nursery Rhymes &amp; Animal Songs | Preschool Music | Sing And Dance",
      description:
        "Come along and sing the Surprise Magic Egg Song. Eggy Wawa Where Are You? Dance and sing along with the magical ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/7oVYSbWyrlc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/7oVYSbWyrlc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/7oVYSbWyrlc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "EggyWawa",
      liveBroadcastContent: "none",
      publishTime: "2024-04-06T20:56:43Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "BXNs_fkmrV3POBaF6neMDWJkYSI",
    id: {
      kind: "youtube#video",
      videoId: "NDRR6_L0X_A",
    },
    snippet: {
      publishedAt: "2024-03-25T01:02:01Z",
      channelId: "UCRjTtUHdDFHf-vx2vyol1Fg",
      title:
        "Magic Egg Hunt Song On The Farm | Where Are You? | Nursery Rhymes &amp; Animal Songs | SONG CLIPS",
      description:
        "Come along and sing the Eggy Wawa Where Are You Farm Song for kids, with the magical surprise eggs the eggy wawas.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/NDRR6_L0X_A/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/NDRR6_L0X_A/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/NDRR6_L0X_A/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "EggyWawa",
      liveBroadcastContent: "none",
      publishTime: "2024-03-25T01:02:01Z",
    },
  },
];

const VideoSlider = () => {
  return (
    <div className="videoSliderWrapper">
      <Swiper
        navigation={true}
        spaceBetween={5}
        slidesPerView={3}
        slidesPerGroup={3}
        // slidesPerView={"auto"}
        // slidesPerGroup={3}
        modules={[Navigation]}
        className="swiper"
      >
        {list.map((video) => (
          <SwiperSlide
            key={video.id.videoId}
            className="swiperSlide"
            // style={{
            //   width: "100%",
            //   maxWidth: "400px",
            // }}
          >
            <VideoCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
