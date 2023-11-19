import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dummyImage from "../images/dummy.jpg";
import { useMediaQuery } from "@mui/material";
const About = () => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <>
      <div style={{ minHeight: "90vh", width: "100%"}} className="align-items-center row">
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
            <img src={dummyImage} style={{ height: matches ? "350px" : "550px" }} />
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
              variant="h3"
              margin={5}
              marginRight={10}
              fontSize={35}
              
              textAlign="center"
            >
              Discover Utpal Abhishek, a versatile creator skilled in sketching, 
              oil painting, and diverse artistic forms, capturing emotions uniquely.
            </Typography>
            

            <Button
              variant="contained"
              sx={{ backgroundColor: "#949083", width: "140px", alignSelf: "center" }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
