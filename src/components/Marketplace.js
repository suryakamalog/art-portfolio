import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "../firebase";

const Marketplace = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // Fetch and listen to changes in the "images" node
    const imagesRef = dbRef(database, "images");

    const fetchData = () => {
      onValue(imagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const imageList = Object.entries(data).map(([key, value]) => ({
            key: key,
            ...value,
          }));
          setImages(imageList);
        }
      });
    };

    fetchData();

    return () => {
      // Cleanup the listener when the component unmounts
      // This is important to avoid memory leaks
      onValue(imagesRef, () => {});
    };
  }, []);

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
        Marketplace
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ImageList sx={{ width: 1000 }}>
          {images.map((item) => (
            <ImageListItem key={item.img} sx={{ margin: 2,}}>
              <img
              style={{objectFit: 'contain'}}
                srcSet={item.imageUrl}
                
                alt={item.title}
                loading="lazy"
              />
              <CustomImageListItemBar
                key={item.img}
                title={item.title.toUpperCase()}
                subtitle1={item.description.toUpperCase()}
                subtitle2={item.medium.toUpperCase()}
                subtitle3={item.size.toUpperCase()}
                subtitle4={`₹${item.price}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );
};

export default Marketplace;

const CustomImageListItemBar = ({
  title,
  subtitle1,
  subtitle2,
  subtitle3,
  subtitle4,
}) => {
  return (
    <div key={title} position="below" style={{textAlign: 'center'}}>
      <Typography variant="h6" sx={{ fontSize: 35 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 18, marginBottom: 1 }}>
        {subtitle1}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 18, marginBottom: 1 }}>
        {subtitle2}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 18, marginBottom: 1 }}>
        {subtitle3}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 18, marginBottom: 1 }}>
        {subtitle4}
      </Typography>
      <IconButton onClick={() => {}}>
              <ShoppingBagIcon sx={{ marginRight: 1 }} />
              Contact
            </IconButton>
    </div>
  );
};
