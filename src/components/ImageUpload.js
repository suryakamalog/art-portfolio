import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { v4 } from "uuid";

import Resizer from "react-image-file-resizer";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import Compressor from 'compressorjs';


const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

const ImageUpload = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageType, setImageType] = useState("painting");
  const [paintingUrls, setPaintingUrls] = useState([]);
  const [photographyUrls, setPhotographyUrls] = useState([]);
  const [potraitUrls, setPotraitUrls] = useState([]);

  const paintingListRef = ref(storage, "images/painting");
  const photographyListRef = ref(storage, "images/photography");
  const potraitListRef = ref(storage, "images/potrait");
  useEffect(() => {
    listAll(paintingListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPaintingUrls((prev) => [...prev, url]);
        });
      });
    });
    listAll(photographyListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPhotographyUrls((prev) => [...prev, url]);
        });
      });
    });
    listAll(potraitListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPotraitUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadFile = () => {
    if (imageType === "painting") {
      console.log("uploading painting image");
      if (imageUpload === null) return;
      const imageRef = ref(
        storage,
        `images/painting/${v4() + imageUpload.name}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setPaintingUrls((prev) => [...prev, url]);
        });
      });
    } else if(imageType === "potrait") {
      console.log("uploading potrait image");
      if (imageUpload === null) return;
      const imageRef = ref(
        storage,
        `images/potrait/${v4() + imageUpload.name}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setPotraitUrls((prev) => [...prev, url]);
        });
      });
    }
    else {
      console.log("uploading photography image");
      if (imageUpload === null) return;
      const imageRef = ref(
        storage,
        `images/photography/${v4() + imageUpload.name}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setPhotographyUrls((prev) => [...prev, url]);
        });
      });
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setImageType(event.target.value);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteImageHandler = (imageURL, imageType) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, imageURL);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        if (imageType === "painting") {
          setPaintingUrls(paintingUrls.filter((item) => item !== imageURL));
        } else if(imageType === "painting") {
          setPhotographyUrls(
            potraitUrls.filter((item) => item !== imageURL)
          );
        }
        else {
          setPhotographyUrls(
            photographyUrls.filter((item) => item !== imageURL)
          );
        }
        console.log("fileDeleted successfully...");
      })
      .catch((error) => {
        console.log("Error occurred while deleting");
      });
  };

  const compressImage = (image) => {
    new Compressor(image, {
      quality: 0.7, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.        
        setImageUpload(compressedResult)
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        }}
      >
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Typography
        variant="h1"
        component="h2"
        style={{
          textAlign: "center",
          margin: 30,
          fontFamily: "BlinkMacSystemFont",
        }}
      >
        Image Upload
      </Typography>
      <div
        className="col-md-12"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            height: 200,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              style={{ margin: 20 }}
              type="file"
              onChange={async (event) => {
                try {
                  const file = event.target.files[0];
                  const image = await resizeFile(file);
                  compressImage(image)
                  // console.log(file)
                  // console.log(image);
                  // setImageUpload(compressedImage);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
            <div>
              <label>
                Image Type
                <select value={imageType} onChange={handleChange}>
                  <option value="painting">Painting</option>
                  <option value="potrait">Potrait</option>
                  <option value="photography">Photography</option>
                </select>
              </label>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#949083",

              alignSelf: "center",
            }}
            onClick={uploadFile}
          >
            Upload Image
          </Button>
        </Box>
      </div>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: "center",
          margin: 30,
          fontFamily: "BlinkMacSystemFont",
        }}
      >
        Paintings
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {paintingUrls.map((url, index) => {
          return (
            <div style={{ position: "relative", margin: 10 }} key={index}>
              <>
                <img style={{ display: "block" }} src={url} height={100} />
                <IconButton
                  sx={{ position: "absolute", bottom: 0, left: 0 }}
                  onClick={() => deleteImageHandler(url, "painting")}
                >
                  <DeleteIcon sx={{ color: "maroon", opacity: "70%" }} />
                </IconButton>
              </>
            </div>
          );
        })}
      </div>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: "center",
          margin: 30,
          fontFamily: "BlinkMacSystemFont",
        }}
      >
        Photography
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {photographyUrls.map((url, index) => {
          return (
            <div style={{ position: "relative", margin: 10 }} key={index}>
              <>
                <img style={{ display: "block" }} src={url} height={100} />
                <IconButton
                  sx={{ position: "absolute", bottom: 0, left: 0 }}
                  onClick={() => deleteImageHandler(url, "photography")}
                >
                  <DeleteIcon sx={{ color: "maroon", opacity: "70%" }} />
                </IconButton>
              </>
            </div>
          );
        })}
      </div>
      <Typography
        variant="h3"
        component="h2"
        style={{
          textAlign: "center",
          margin: 30,
          fontFamily: "BlinkMacSystemFont",
        }}
      >
        Potrait
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {potraitUrls.map((url, index) => {
          return (
            <div style={{ position: "relative", margin: 10 }} key={index}>
              <>
                <img style={{ display: "block" }} src={url} height={100} />
                <IconButton
                  sx={{ position: "absolute", bottom: 0, left: 0 }}
                  onClick={() => deleteImageHandler(url, "potrait")}
                >
                  <DeleteIcon sx={{ color: "maroon", opacity: "70%" }} />
                </IconButton>
              </>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageUpload;
