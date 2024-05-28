import { Box, keyframes, styled } from "@mui/material";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderComponent = styled(Box)(() => ({
  border: "5px solid #fff",
  borderRadius: "50%",
  borderTop: "5px solid red",
  width: "50px",
  height: "50px",
  animation: `${spin} 2s linear infinite`,
}));

const Loader = () => {
  return <LoaderComponent />;
};

export default Loader;
