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
import watermark from 'watermarkjs';

const ImageUpload = () => {
  const [imageUpload, setImageUpload] = useState([]);
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

  const uploadFiles = () => {
    if (imageType === "painting") {
      console.log("uploading painting images");
      console.log(imageUpload.length)
      if (!imageUpload || imageUpload.length === 0) return;

      const uploadTasks = imageUpload.map((file) => {
        const imageRef = ref(storage, `images/painting/${v4() + file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => getDownloadURL(snapshot.ref));
      });
  
      Promise.all(uploadTasks)
        .then((urls) => {
          setPaintingUrls((prev) => [...prev, ...urls]);
        })
        .catch((error) => {
          console.error("Error uploading images: ", error);
        });
    } else if (imageType === "potrait") {
      console.log("uploading portrait images");
      console.log(imageUpload.length)
      if (!imageUpload || imageUpload.length === 0) return;

      const uploadTasks = imageUpload.map((file) => {
        const imageRef = ref(storage, `images/potrait/${v4() + file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => getDownloadURL(snapshot.ref));
      });
  
      Promise.all(uploadTasks)
        .then((urls) => {
          setPotraitUrls((prev) => [...prev, ...urls]);
        })
        .catch((error) => {
          console.error("Error uploading images: ", error);
        });
    } else {
      console.log("uploading photography images");
      console.log(imageUpload.length)
      if (!imageUpload || imageUpload.length === 0) return;

      const uploadTasks = imageUpload.map((file) => {
        const imageRef = ref(storage, `images/photography/${v4() + file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => getDownloadURL(snapshot.ref));
      });
  
      Promise.all(uploadTasks)
        .then((urls) => {
          setPhotographyUrls((prev) => [...prev, ...urls]);
        })
        .catch((error) => {
          console.error("Error uploading images: ", error);
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
        } else if(imageType === "photography") {
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

  const processImages = async (files) => {
    const processedPromises = Array.from(files).map(async (file) => {
      const watermarkedFile = await addWatermark(file);
      const resizedFile = await resizeFile(watermarkedFile);
      const compressedFile = await compressImage(resizedFile);
      return compressedFile;
    });
  
    return Promise.all(processedPromises);
  };

  function imgTagToFile(imgElement, fileName, mimeType) {
    return new Promise((resolve) => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // Set canvas dimensions to match the image
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
  
      // Draw the image onto the canvas
      context.drawImage(imgElement, 0, 0);
  
      // Convert canvas content to Blob
      canvas.toBlob(
        (blob) => {
          // Create a File from the Blob
          const fileOptions = { type: mimeType };
          const file = new File([blob], fileName, fileOptions);
  
          // Resolve with the created File object
          resolve(file);
        },
        mimeType,
        1 // Image quality (1 is maximum)
      );
    });
  }
 
  const addWatermark = (file) =>
  new Promise((resolve) => {
    watermark([file])
      .image(watermark.text.center('Utpal Abhishek', '300px Arial', '#ffffff', 0.5))
      .then((img) => {
        const myFileName = 'example.jpg';
        const myMimeType = 'image/jpeg';

        imgTagToFile(img, myFileName, myMimeType).then((file) => {
          resolve(file);
        });
        
      });
  });

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1500,
        1500,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    });

  const compressImage = (file) =>
    new Promise((resolve) => {
      new Compressor(file, {
        quality: 0.8, // Adjust the quality as needed (0 to 1)
        success(result) {
          resolve(result);
        },
        error(err) {
          console.error(err.message);
          resolve(file); // Resolve with the original file in case of an error
        },
      });
    });


  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              multiple
              onChange={async (event) => {
                try {
                  const files = event.target.files;
                  const resizedAndCompressedFiles = await processImages(files);
                  setImageUpload(resizedAndCompressedFiles);
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
            onClick={uploadFiles}
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
        Portrait
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
