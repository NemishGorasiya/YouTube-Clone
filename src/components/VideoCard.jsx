import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDistanceToNow } from "date-fns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { formatCompactNumber } from "../utils/utilityFunction";

const theme = createTheme({
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          "&:hover": {
            // backgroundColor: "#ffffff",
            // boxShadow: "none",
          },
        },
      },
    },
  },
});

const VideoCard = ({ video }) => {
  console.log("video", video);
  const {
    id,
    snippet,
    statistics: { viewCount },
  } = video;

  const {
    publishedAt,
    title,
    channelTitle,
    thumbnails: {
      medium: { url },
    },
  } = snippet;

  return (
    <ThemeProvider theme={theme}>
      <Grid item>
        <Card elevation={0}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={url}
              alt="Video Thumbnail"
              sx={{ borderRadius: "14px" }}
            />
            <CardContent sx={{ paddingX: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 50,
                    width: 50,
                    borderRadius: "50%",
                  }}
                  alt="Channel Thumbnail"
                  src="https://placehold.jp/150x150.png"
                />
                <Box>
                  <Typography
                    sx={{
                      lineHeight: "1.2",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: "2",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                    }}
                    gutterBottom
                    variant="subtitle1"
                    component="h2"
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {channelTitle}
                    <CheckCircleIcon
                      fontSize="x-small"
                      sx={{ marginLeft: "5px" }}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatCompactNumber(viewCount)} views •{" "}
                    {formatDistanceToNow(publishedAt, { addSuffix: true })}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default VideoCard;
