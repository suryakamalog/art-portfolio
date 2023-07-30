import * as React from "react";
import { useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
  Stack,
  IconButton
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

const ImageGallery = () => {
  const itemData = [
    {
      img: "https://lh3.googleusercontent.com/fife/APg5EObYGCybUrxf4uZW_vsJGWAet_J6Ys2RydPPRahxe8mx8uGU6v9oV8T5mMkw_dP0E2ZBFessImhroGajvCQEW82U24QVrrNpORuVXkBN7b38mFPHNoAG-l6nA4t_y_kBxg_wMyod_nrkMF_8wsPc8g8uJvs7xR_qLUmThTFLcE0HM_6WPoc6Ph0P5IpOeg5URQgKqT-EPYQcCBmSWpKUEejpLgI9ytKiQRMZhLwEv_EEEIMqe8khZ2jlUJiqWdttW6E7G6Q5X15F3uBKC6ATlBiiu2_ELys1Jelzrz3EhgACEl2awvEWFYXqzxMJiykLYg6AVvu4hHRr9X6PxaGbV4YrDMdtlLo9bIvymdibvNagU2IwtMnzSAYWmDxBqAP7LkX1m-e-Hge4jMkHR1YfgzB_zrSOlJVDwyXSMfpYUBIsOUnsMkMut9aaIUOzehkkU9q-dKj8Lhia3cJUQBjryp1L4XEpyB8YN50cxHZ-f6nKUT2gwCymH1qkBO1i0mLoFVcsUExgJGooW9r9CQeB8_NC-RQw28XP_HmJng3xto6-87pYqW8UWyH_YzAMgnyyqn5I6hGmMokZ24uevk6CbDZSus2h1MPOifR_PfIijqc6_FAUpJADmtSbtmxixPG8xFe8aZ0bF7oqHU2ztXIQMbUwLYBheMvHJexje245qK0tOO3z084Mr5vGatnetgOzSsPIT07DcPuk9vPOa22HsDLt1fenh6zVfr8URwB_FLNp-MF1Lr86jru3kmVQssh4_w1CQdB81t_C34qmKNovfDgMTLa8Am8rfbv6XaBUZQRoRVm4Aqt2q-_K7Osdwfmli5t1_jjij9QTVI9a8OqUEPByL0vwN3GDW-v4lJZSGs8UdRn_FwGr7myuBOH_aVbaYOwakatN3ekxFfaNV1I_eoFKf9s35wzWA8qeeh_vQFN2ozcoBqHkC1hTLQeUEfjjyDGnIuqTbI8JPfI_YfdrMxGj3yBAn-PzYNgzOHDnalTDfa6AMfJlw_dGefXVZbFiXH_XmVzLmfIqvrEsx3mqVloVqzzRyl6RAMpHn7CW1baLDeo5B8yj3yjWVHCTvtrYzjgdTZF2vuEtRRvGxjtONCzNPDA6ueodOFaSaqyYhpMbAesijwTAKqg0tE0bZwK_C4fVd7Oxizb4UqEDpDXeEfYx8HLrolcR-hyr35Gux9jgiAu5nIyhyWcNEc_pAqZ5UXuF4ab_uotJb5d-iPzMvq1D6Oi8eI5xgiZPOK8JvCYvz_9TzWjoITwXaaN0wRgMPdEBmuAbrsZbqNf-JOdKZDLTSGQOWiEWaDWg_buA-T6T8_r2kqcZR7vwbVmlesrAa9W6NEHFVfmZTwysAr0S3TAvHXgkmnen3QaX2zOfXwefJLFFKpXjfodiw6C_bxc7KX8Oqlviq0NqmZHdVlw-OYz2wJZl7DcVi15RXwlRMz65qK8kcvOEeIy6d3_gpAmyAveH_efa4tQ4a7eLLz0miY5l4uwLosVl1xCd_WLlXCzI22nMrMcw_yA6VuCkbHps4XxOGOQz=w1919-h928",
      title: "Bed",
    },
    {
      img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
      title: "Books",
    },
    {
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      title: "Sink",
    },
    {
      img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
      title: "Kitchen",
    },
    {
      img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
      title: "Blinds",
    },
    {
      img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
      title: "Chairs",
    },
    {
      img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
      title: "Laptop",
    },
    {
      img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
      title: "Doors",
    },
    {
      img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
      title: "Storage",
    },
    {
      img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
      title: "Candle",
    },
    {
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      title: "Coffee table",
    },
  ];
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [imageIndex, setImageIndex] = useState(0);
  const handleOpen = (index) => {
    setOpen(true);
    setImageIndex(index);
  };
  const nextImage = () => {
    if(imageIndex == itemData.length -1) setImageIndex(0);
    else setImageIndex(imageIndex+1);
  };
  const prevImage = () => {
    if(imageIndex == 0) setImageIndex(itemData.length -1);
    else setImageIndex(imageIndex-1);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <ImageList variant="masonry" cols={5} gap={8}>
          {itemData.map((item, index) => (
            <ImageListItem key={item.img} sx={{ cursor: 'pointer' }}>
              <img
                // src={`${item.img}?w=248&fit=crop&auto=format`}
                src={`${item.img}`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                onClick={() => handleOpen(index)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack>
        <Box sx={style}>
          <img src={`${itemData[imageIndex].img}?w=500&fit=crop&auto=format`} />
        </Box>
        <IconButton onClick={() => nextImage()} sx={nextArrowStyles}><ArrowForwardIosIcon /></IconButton>
        <IconButton onClick={() => prevImage()} sx={prevArrowStyles}><ArrowBackIosIcon /></IconButton>
        </Stack>
      </Modal>
    </>
  );
};

export default ImageGallery;
