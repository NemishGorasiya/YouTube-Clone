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
  const params = {
    ...queryParams,
    pageToken: nextPageToken,
    key: import.meta.env.VITE_GOOGLE_API_KEY,
  };

  const response = await axiosInstance.get(url, {
    params: params,
    signal: abortController?.signal,
  });

  const responseData = response.data;
  if (responseData) {
    return responseData;
  }
};

export const fetchComments = async ({
  queryParams,
  abortController,
  accessToken,
  url,
}) => {
  const response = await axiosInstance.get(url, {
    params: queryParams,
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

export const fetchPlaylistItems = async ({
  queryParams,
  abortController,
  accessToken,
}) => {
  const url = "/playlistItems";
  const response = await axiosInstance.get(url, {
    params: queryParams,
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

export const fetchChannelSections = async ({
  queryParams,
  abortController,
  accessToken,
}) => {
  const url = "/channelSections";
  const response = await axiosInstance.get(url, {
    params: queryParams,
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

export const fetchChannelDetails = async ({
  queryParams,
  accessToken,
  abortController,
}) => {
  const url = "/channels";
  const response = await axiosInstance.get(url, {
    params: queryParams,
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
export const addComment = async ({ queryParams, data, accessToken }) => {
  const url = "/commentThreads";
  try {
    const response = await axiosInstance.post(url, data, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = response.data;
    if (responseData) {
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
};
export const replyComment = async ({ queryParams, data, accessToken }) => {
  const url = "/comments";
  try {
    const response = await axiosInstance.post(url, data, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = response.data;
    if (responseData) {
      return responseData;
    }
  } catch (error) {
    console.error(error);
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
