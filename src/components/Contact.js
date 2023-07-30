import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dummyImage from "../images/dummy.jpg";
import { TextField } from "@mui/material";
const Conatct = () => {
  return (
    <>
      <div style={{ minHeight: "90vh", width: "100%"}} className="align-items-center row">
        <div
          className="col-md-12"
          style={{
            display: "flex",
            // flexWrap: "wrap",
            // alignItems: "center",
            // justifyContent: "center",
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
            <img src={dummyImage} style={{ height: "550px" }} />
          </div>
          <div className="col-md-6" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                width: "500px",
                margin: "auto",
              }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                width: "500px",
                margin: "20px",
              }}
            >
              <Typography
                variant="h1"
                fontSize={50}
                textAlign="center"
                margin={5}
              >
                Get in touch
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // alignItems: "center",
                }}
              >
                <TextField
                fullWidth
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
                <TextField
                fullWidth
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
              </div>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ m: 1 }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={4}
                sx={{ m: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#949083",
                  width: "140px",
                  alignSelf: "center",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conatct;
