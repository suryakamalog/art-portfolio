import { Typography } from "@mui/material";
import ImageGallery from "./ImageGallery";

const Paintings = () => {
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
        Art
      </Typography>
      <ImageGallery pageType={"painting"}/>
    </>
  );
};

export default Paintings;
