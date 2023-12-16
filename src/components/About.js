import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import profilePhoto from "../images/profilePhoto.jpeg";
import { useMediaQuery } from "@mui/material";
import { IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
const About = () => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <div
        style={{ minHeight: "90vh", width: "100%" }}
        className="align-items-center row"
      >
        <div
          className="col-md-12"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="col-md-6"
            style={{
              alignSelf: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={profilePhoto}
              style={{ height: matches ? "350px" : "550px" }}
            />
          </div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              margin={5}
              marginRight={10}
              fontSize={35}
              textAlign="center"
            >
              Discover Utpal Abhishek, a versatile creator skilled in sketching,
              oil painting, and diverse artistic forms, capturing emotions
              uniquely.
            </Typography>
            <IconButton onClick={() => window.open("https://wa.me/919155578473")}>
              <LocalPhoneIcon sx={{ marginRight: 1 }} />
              +91-9155578473
            </IconButton>
            <IconButton
              onClick={() =>
                window.open("https://www.instagram.com/abhishekutpal.artpage")
              }
            >
              <InstagramIcon sx={{  marginRight: 1 }} />
              abhishekutpal.artpage
            </IconButton>
            <IconButton onClick={() => {}}>
              <EmailIcon sx={{  marginRight: 1 }} />
              utpalabhishekexog@gmail.com
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
