import { Box, Grid } from "@mui/material";

const PlaylistCard = () => {
  const data = {
    kind: "youtube#playlist",
    etag: "_9CboHihUFawQJ12Pzuson-sshg",
    id: "PLCdCybB2YSyuK4OlsGZGp0DSfRXXtbr35",
    snippet: {
      publishedAt: "2024-05-04T12:10:31Z",
      channelId: "UCI-GE2iPiVk-dC5bKIxCjnw",
      title: "new",
      description: "",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/img/no_thumbnail.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/img/no_thumbnail.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/img/no_thumbnail.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "nemish",
      localized: {
        title: "new",
        description: "",
      },
    },
    status: {
      privacyStatus: "private",
    },
    contentDetails: {
      itemCount: 0,
    },
    player: {
      embedHtml:
        '\u003ciframe width="640" height="360" src="http://www.youtube.com/embed/videoseries?list=PLCdCybB2YSyuK4OlsGZGp0DSfRXXtbr35" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen\u003e\u003c/iframe\u003e',
    },
  };

  const {
    id,
    snippet: {
      title,
      thumbnails: {
        default: { url },
      },
    },
    status: { privacyStatus },
    contentDetails: { itemCount },
  } = data;

  return (
    <Grid item>
      <Box
        sx={{
          display: "flex",
          aspectRatio: "16/9",
          borderRadius: "8px",
          position: "relative",
          zIndex: "1",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
          }}
          src={url}
          alt="playlist Thumbnail"
        />
        <Box
          sx={{
            position: "absolute",
            height: "90%",
            width: "93%",
            background: "rgb(96, 96, 96)",
            outline: "1px solid #000",
            top: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "inherit",
            zIndex: "-1",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            height: "90%",
            width: "85%",
            background: "rgb(96, 96, 96)",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "inherit",
            zIndex: "-2",
          }}
        ></Box>
      </Box>
      <p>{title}</p>
      <p>{itemCount} videos</p>
      <p>{privacyStatus}</p>
    </Grid>
  );
};

export default PlaylistCard;
