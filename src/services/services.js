import axios from "axios";

import axiosInstance from "../axios/axiosInstance";

export const getUserInfo = async ({ accessToken }) => {
  const params = { access_token: accessToken };
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

export const httpRequest = async ({
  url,
  method = "GET",
  queryParams = {},
  headers = {},
  data = {},
  abortController = null,
  returnEntireResponseWithStatusCode = false,
}) => {
  const params = { ...queryParams, key: import.meta.env.VITE_GOOGLE_API_KEY };
  try {
    const config = {
      method,
      url,
      params: params,
      headers,
      data,
      ...(abortController && { signal: abortController.signal }),
    };
    const res = await axiosInstance(config);
    if (returnEntireResponseWithStatusCode) {
      return res;
    } else {
      return res.data;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      console.error("Error fetching data", error);
    }
    throw error;
  }
};
