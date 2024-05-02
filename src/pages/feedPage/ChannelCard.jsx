import { Box } from "@mui/material";
import React from "react";

const ChannelCard = ({ channel }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <div>
        <img
          style={{
            height: "150px",
            width: "150px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src="https://placehold.co/600x400"
          alt=""
        />
      </div>
      <h1>Channel Name</h1>
      <button>Subscribed</button>
    </Box>
  );
};

export default ChannelCard;
