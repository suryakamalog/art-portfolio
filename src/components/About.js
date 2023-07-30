import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dummyImage from "../images/dummy.jpg";
const About = () => {
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
            <img src={dummyImage} style={{ height: "550px"}} />
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
              Hello, I am Adam Halls. A textile artist and painter based on
              Bodmin Moor, Cornwall. My work is carefully built up of layers of
              fabric and paint which are brought together with many different
              stitching techniques.
            </Typography>
            <Typography
              variant="h4"
              margin={5}
              marginRight={10}
              fontSize={25}
              textAlign="center"
            >
              I am inspired by the intricate details of algae, Lichens, rust and
              weathered surfaces. My pieces are incredibly complex, working on
              layers and welding them together on the sewing machine over many
              weeks.
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
