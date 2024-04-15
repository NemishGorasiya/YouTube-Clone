import axios from "axios";

const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const API_KEY_PARAM = `&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

export const fetchVideos = async ({
  nextPageToken,
  url: relativeUrl,
  abortController,
}) => {
  const nextPageTokenParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
  const url = BASE_URL + relativeUrl + nextPageTokenParam + API_KEY_PARAM;
  const options = abortController ? { signal: abortController.signal } : {};
  const response = await axios.get(url, options);
  const responseData = response.data;
  if (responseData) {
    return responseData;
  }
};

export const getComments = async ({
  nextPageToken,
  url: relativeUrl,
  abortController,
}) => {
  const nextPageTokenParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
  const url = BASE_URL + relativeUrl + nextPageTokenParam + API_KEY_PARAM;
  const options = abortController ? { signal: abortController.signal } : {};
  const response = await axios.get(url, options);
  const responseData = response.data;
  if (responseData) {
    return responseData;
  }
};
