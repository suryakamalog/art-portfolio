import { Typography } from "@mui/material";
import ImageGallery from "./ImageGallery";

const Potraits = () => {
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
        Portrait
      </Typography>
      <ImageGallery pageType={"potrait"}/>
    </>
  );
};

export default Potraits;
