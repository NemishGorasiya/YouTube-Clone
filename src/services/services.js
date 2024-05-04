import axios from "axios";

import axiosInstance from "../axios/axiosInstance";

const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const API_KEY_PARAM = `&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

export const fetchVideos = async ({
  nextPageToken,
  url,
  queryParams,
  abortController,
}) => {
  // const nextPageTokenParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
  const params = {
    ...queryParams,
    pageToken: nextPageToken,
    key: import.meta.env.VITE_GOOGLE_API_KEY,
  };
  // const url = BASE_URL + relativeUrl + nextPageTokenParam + API_KEY_PARAM;
  // const options = abortController ? { signal: abortController.signal } : {};

  const response = await axiosInstance.get(url, {
    params: params,
    signal: abortController?.signal,
  });

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

export const getSubscribedChannels = async ({
  queryParams,
  accessToken,
  abortController,
}) => {
  const params = { ...queryParams, key: import.meta.env.VITE_GOOGLE_API_KEY };
  const url = "/subscriptions";
  const response = await axiosInstance.get(url, {
    params: params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    signal: abortController?.signal,
  });
  const responseData = response.data;
  if (responseData) {
    return responseData;
  }
};
export const fetchPlaylists = async ({
  queryParams,
  accessToken,
  abortController,
}) => {
  const params = { ...queryParams, key: import.meta.env.VITE_GOOGLE_API_KEY };
  const url = "/playlists";
  const response = await axiosInstance.get(url, {
    params: params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    signal: abortController?.signal,
  });
  const responseData = response.data;
  if (responseData) {
    return responseData;
  }
};

export const getUserInfo = async ({ accessToken }) => {
  const params = { access_token: accessToken };
  console.log("accessToken in service", accessToken);
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const response = await axios.get(url, {
    params: params,
  });
  const responseData = response.data;
  if (responseData) {
    return responseData;
  }
};

export const fetchAccessToken = async ({ urlencoded, abortController }) => {
  const requestOptions = {
    method: "POST",
    body: urlencoded,
    signal: abortController ? abortController.signal : null,
  };

  try {
    const res = await fetch(
      "https://oauth2.googleapis.com/token",
      requestOptions
    );
    if (res) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
