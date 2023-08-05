import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
  IconButton,
  useMediaQuery
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  // p: 4,
};

const nextArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};
const prevArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const ImageGallery = ({ pageType }) => {
  const [paintingUrls, setPaintingUrls] = useState([]);
  const paintingListRef = ref(storage, "images/painting/");
  const [photographyUrls, setphotographyUrls] = useState([]);
  const photographyListRef = ref(storage, "images/photography/");

  useEffect(() => {
    if (pageType === "painting") {
      listAll(paintingListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setPaintingUrls((prev) => [...prev, url]);
          });
        });
      });
    } else {
      listAll(photographyListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setphotographyUrls((prev) => [...prev, url]);
          });
        });
      });
    }
  }, []);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [imageIndex, setImageIndex] = useState(0);
  const handleOpen = (index) => {
    setOpen(true);
    setImageIndex(index);
  };
  var imageUrlsLength;
  const nextImage = () => {
    if (pageType === "painting") {
      imageUrlsLength = paintingUrls.length;
    } else {
      imageUrlsLength = photographyUrls.length;
    }
    console.log(imageIndex);
    console.log(imageUrlsLength);

    if (imageIndex === imageUrlsLength - 1) setImageIndex(0);
    else setImageIndex(imageIndex + 1);
  };
  const prevImage = () => {
    if (pageType === "painting") {
      imageUrlsLength = paintingUrls.length;
    } else {
      imageUrlsLength = photographyUrls.length;
    }
    if (imageIndex === 0) setImageIndex(imageUrlsLength - 1);
    else setImageIndex(imageIndex - 1);
  };
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {pageType === "painting" ? (
          <ImageList variant="masonry" cols={matches ? 1 : 4 } gap={10}>
            {paintingUrls.map((item, index) => (
              <ImageListItem key={index} sx={{ cursor: "pointer" }}>
                <img
                  
                  // src={`${item.img}?w=248&fit=crop&auto=format`}
                  src={`${item}`}
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  // alt={item.title}
                  loading="lazy"
                  onClick={() => handleOpen(index)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <ImageList variant="masonry" cols={matches ? 1 : 4 } gap={10}>
            {photographyUrls.map((item, index) => (
              <ImageListItem key={index} sx={{ cursor: "pointer" }}>
                <img
                  // src={`${item.img}?w=248&fit=crop&auto=format`}
                  src={`${item}`}
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  // alt={item.title}
                  loading="lazy"
                  onClick={() => handleOpen(index)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack>
          <Box sx={style}>
            {pageType === "painting" ? (
              <img src={`${paintingUrls[imageIndex]}`} height="600" />
            ) : (
              <img src={`${photographyUrls[imageIndex]}`} height="600" />
            )}
          </Box>
          <IconButton onClick={() => nextImage()} sx={nextArrowStyles}>
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton onClick={() => prevImage()} sx={prevArrowStyles}>
            <ArrowBackIosIcon />
          </IconButton>
        </Stack>
      </Modal>
    </>
  );
};

export default ImageGallery;
