import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import ImageUpload from "./ImageUpload";
import MarketplaceImageUpload from "./MarketplaceImageUpload";

function SignIn({ imageUploadType }) {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div>
      {value ? (
        imageUploadType == "imageupload" ? (
          <ImageUpload />
        ) : (
          <MarketplaceImageUpload />
        )
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={handleClick}>Signin With Google</button>
        </div>
      )}
    </div>
  );
}
export default SignIn;
