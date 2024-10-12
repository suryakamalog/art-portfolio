import Typography from "@mui/material/Typography";
import profilePhoto from "../images/profilePhoto.jpeg";
import { useMediaQuery } from "@mui/material";
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

            <div style={{ margin: 10 }}>
              <LocalPhoneIcon style={{ marginRight: 10 }}/>
              <a
                href="https://wa.me/919155578473"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "grey" }}
              >
                +91-9155578473
              </a>
            </div>

            <div style={{ margin: 10 }}>
              <InstagramIcon style={{ marginRight: 10 }}/>

              <a
                href="https://www.instagram.com/utpalabhish_ek.501"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "grey" }}
              >
                utpalabhish_ek.501
              </a>
            </div>

            <div style={{ margin: 10, color: "grey" }}>
              <EmailIcon style={{ marginRight: 10, color: "black" }} />
              utpalabhishekexog@gmail.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
