import { Typography } from "@mui/material";
import ImageGallery from "./ImageGallery";

const Photography = () => {
  return (
    <>
      <Typography
        variant="h1"
        component="h2"
        style={{
          textAlign: "center",
          margin: 30,
          fontFamily: "BlinkMacSystemFont",
        }}
      >
        Photography
      </Typography>
      <ImageGallery pageType={"photography"}/>
    </>
  );
};

export default Photography;
