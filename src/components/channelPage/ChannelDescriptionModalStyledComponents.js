import styledConfig from "../../utils/styledConfig";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";

export const DescriptionItem = styledConfig(MuiTypography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  color: theme.palette.primary.main,
  "& .MuiSvgIcon-root": {
    fontSize: "26px",
  },
}));

export const DescriptionItemsWrapper = styledConfig(MuiBox)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const ChannelDescription = styledConfig(MuiTypography)(({ theme }) => ({
  fontSize: "15px",
  color: theme.palette.primary.main,
}));

export const ModalContent = styledConfig(MuiBox)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
