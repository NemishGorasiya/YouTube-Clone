import { styled } from "@mui/material";

const styledConfig = (element, option) => {
  return styled(element, {
    shouldForwardProp: (prop) => !prop.startsWith("$"),
    ...option,
  });
};

export default styledConfig;
