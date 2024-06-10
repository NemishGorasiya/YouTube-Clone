import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import styledConfig from "../utils/styledConfig";
import { Box, Button, Typography } from "@mui/material";

export const PlaylistTitleWrapper = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const PlaylistTitleTypography = styledConfig(Typography)({
  margin: "8px 0",
  fontSize: "20px",
  fontWeight: "600",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const PlaylistViewAllButton = styledConfig(Button)({
  minWidth: "fit-content",
  height: "fit-content",
});

export const PlaylistViewAllButtonWrapperLink = styledConfig(Link)({
  flexShrink: 0,
});

export const VideoSliderWrapper = styledConfig(Box)({
  position: "relative",
  marginBottom: "16px",
});

export const StyledSwiper = styledConfig(Swiper)({
  width: "100%",
  padding: "4px",
  position: "static",
  "& .swiper-button-prev, & .swiper-button-next": {
    top: "50%",
    height: "40px",
    width: "40px",
    "&::after": {
      height: "100%",
      width: "100%",
      fontSize: "17px",
      color: "#f1f1f1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      background: "#282828",
    },
  },
  "& .swiper-button-prev": {
    left: 0,
    transform: "translate(-50%, -50%)",
  },
  "& .swiper-button-next": {
    right: 0,
    transform: "translate(50%, -50%)",
  },
  "& .swiper-button-disabled": {
    display: "none",
  },
});

export const StyledSwiperSlide = styledConfig(SwiperSlide)({
  height: "unset",
});
