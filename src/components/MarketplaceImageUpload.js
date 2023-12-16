import React, { useState, useEffect } from "react";
import {
  ref as storRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  push,
  ref as dbRef,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { database, storage, auth } from "../firebase";
import { signOut } from "firebase/auth";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const MarketplaceImageUpload = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [imageData, setImageData] = useState({
    title: "",
    medium: "",
    size: "",
    description: "",
    price: "",
  });
  const [editMode, setEditMode] = useState({});
  const [editingFlags, setEditingFlags] = useState({});
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
  }, [newImage]);

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

  const handleUpload = async () => {
    if (newImage) {
      const storageRef = storRef(storage, `images/${newImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newImage);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading image:", error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          saveDataToDatabase(downloadURL);
        }
      );
    } else {
      console.error("Please select an image to upload.");
    }
  };

  const saveDataToDatabase = (imageUrl) => {
    const imagesRef = dbRef(database, "images");

    const newData = {
      ...imageData,
      imageUrl: imageUrl,
    };

    update(imagesRef, { [Date.now()]: newData })
      .then(() => {
        console.log("Data saved successfully.");
        setNewImage(null);
        setImageData({
          title: "",
          medium: "",
          size: "",
          description: "",
          price: "",
        });
        setEditMode({});
      })
      .catch((error) => {
        console.error("Error saving data:", error.message);
      });
  };

  const handleDeleteImage = (key) => {
    const imageRef = dbRef(database, `images/${key}`);
    const storageImageRef = storRef(storage, `images/${key}`);

    // Delete image from storage
    remove(storageImageRef)
      .then(() => {
        console.log("Image deleted from storage successfully.");
      })
      .catch((error) => {
        console.error("Error deleting image from storage:", error.message);
      });

    // Delete image data from database
    remove(imageRef)
      .then(() => {
        console.log("Image data deleted from database successfully.");
      })
      .catch((error) => {
        console.error(
          "Error deleting image data from database:",
          error.message
        );
      });
  };

  const removeEmptyFields = (data) => {
    const newData = {};
    for (const key in data) {
      if (data[key] !== "") {
        newData[key] = data[key];
      }
    }
    return newData;
  };

  const handleUpdateFields = (key) => {
    const imageRef = dbRef(database, `images/${key}`);
    console.log(imageData);
    const cleanedData = removeEmptyFields(imageData);
    update(imageRef, cleanedData)
      .then(() => {
        console.log("Fields updated successfully.");
        setImageData({
          title: "",
          medium: "",
          size: "",
          description: "",
          price: "",
        });
        setEditMode({});
        setEditingFlags((prevEditingFlags) => ({
          ...prevEditingFlags,
          [key]: false,
        }));
      })
      .catch((error) => {
        console.error("Error updating fields:", error.message);
      });
  };

  const handleInputChange = (field, value) => {
    console.log("handleinputchange");
    setImageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(imageData);
  };

  const handleToggleEditMode = (key, field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [key]: {
        ...prevEditMode[key],
        [field]: !prevEditMode[key]?.[field],
      },
    }));

    setEditingFlags((prevEditingFlags) => ({
      ...prevEditingFlags,
      [key]: true,
    }));
  };

  return (
    <div>
      <div
        
        style={{
            margin: "auto",
            width: 200,
            display: "flex",
            flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
          
        }}
      >
        <button onClick={handleLogout}>Logout</button>
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        <input
          type="text"
          placeholder="Medium"
          onChange={(e) => handleInputChange("medium", e.target.value)}
        />
        <input
          type="text"
          placeholder="Size"
          onChange={(e) => handleInputChange("size", e.target.value)}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
        
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      {/* Display uploaded images and captions */}
      <ul>
        {images.map((image) => (
          <li key={image.key}>
            <img src={image.imageUrl} alt={image.title} height={150} />
            <div>
              <p>
                {editMode[image.key]?.title ? (
                  <input
                    type="text"
                    value={imageData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                ) : (
                  <span>{image.title}</span>
                )}
                {!editingFlags[image.key] ? (
                  <IconButton
                    onClick={() => handleToggleEditMode(image.key, "title")}
                  >
                    <EditIcon sx={{ color: "maroon", opacity: "70%" }} />
                  </IconButton>
                ) : (
                  <button onClick={() => handleUpdateFields(image.key)}>
                    Update
                  </button>
                )}
              </p>
              <p>
                {editMode[image.key]?.description ? (
                  <input
                    type="text"
                    value={imageData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                ) : (
                  <span>{image.description}</span>
                )}
                {!editingFlags[image.key] ? (
                  <IconButton
                    onClick={() =>
                      handleToggleEditMode(image.key, "description")
                    }
                  >
                    <EditIcon sx={{ color: "maroon", opacity: "70%" }} />
                  </IconButton>
                ) : (
                  <button onClick={() => handleUpdateFields(image.key)}>
                    Update
                  </button>
                )}
              </p>
              <p>
                {editMode[image.key]?.medium ? (
                  <input
                    type="text"
                    value={imageData.medium}
                    onChange={(e) =>
                      handleInputChange("medium", e.target.value)
                    }
                  />
                ) : (
                  <span>{image.medium}</span>
                )}
                {!editingFlags[image.key] ? (
                  <IconButton
                    onClick={() => handleToggleEditMode(image.key, "medium")}
                  >
                    <EditIcon sx={{ color: "maroon", opacity: "70%" }} />
                  </IconButton>
                ) : (
                  <button onClick={() => handleUpdateFields(image.key)}>
                    Update
                  </button>
                )}
              </p>
              <p>
                {editMode[image.key]?.size ? (
                  <input
                    type="text"
                    value={imageData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                  />
                ) : (
                  <span>{image.size}</span>
                )}
                {!editingFlags[image.key] ? (
                  <IconButton
                    onClick={() => handleToggleEditMode(image.key, "size")}
                  >
                    <EditIcon sx={{ color: "maroon", opacity: "70%" }} />
                  </IconButton>
                ) : (
                  <button onClick={() => handleUpdateFields(image.key)}>
                    Update
                  </button>
                )}
              </p>
              <p>
                {editMode[image.key]?.price ? (
                  <input
                    type="text"
                    value={imageData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                ) : (
                  <span>{image.price}</span>
                )}
                {!editingFlags[image.key] ? (
                  <IconButton
                    onClick={() => handleToggleEditMode(image.key, "price")}
                  >
                    <EditIcon sx={{ color: "maroon", opacity: "70%" }} />
                  </IconButton>
                ) : (
                  <button onClick={() => handleUpdateFields(image.key)}>
                    Update
                  </button>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketplaceImageUpload;
