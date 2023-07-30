import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from "@mui/material";
const Title = () => {
    const theme = createTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      });
  return (
    <>
        <ThemeProvider theme={theme}>
      <Typography variant="h1" component="h2" style={{ textAlign: "center", marginTop: 30, fontFamily: 'BlinkMacSystemFont'}}>
        Utpal Abhishek
      </Typography>

      <Typography variant="h2" component="h2" style={{ textAlign: "center", marginBottom: 30, fontSize: 50}}>
        Fine Art. Photography. Design.
      </Typography>
      </ThemeProvider>
    </>
  );
};

export default Title;
