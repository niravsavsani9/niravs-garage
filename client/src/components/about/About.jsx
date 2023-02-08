import React from "react";
import { Typography, Box, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { border } from "@mui/system";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#050505",
    },
  },
});

export const About = () => {
  const [light, setLight] = React.useState(true);
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />

      <Box
        component="img"
        sx={{
          height: 650,
          width: 1425,
          marginLeft: 0,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, md: 250 },
        }}
        alt="Automobile garage"
        src="https://as2.ftcdn.net/v2/jpg/03/35/00/27/1000_F_335002773_eBur3RS0WngMyN4Pzx6iKo15VMe0oMSJ.jpg"
      />
      <Typography variant="h4" color="white" align="center" m={3}>
        About us
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{
          textAlign: "justify",
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 5,
          marginRight: 5,
          color: "white",
        }}
      >
        Company Name is a full-benefit auto fix shop. Beginning with corner
        stores and car dealerships, he took a shot at a scope of vehicles and
        kept on building up his gifts. Following his energy since the beginning,
        Keith had the ability to pick up understanding and climb the positions
        in each office he worked. Keith’s chance to open his own shop came when
        a resigning manager sold him the business. At just 24 years of age, he
        found the property, sold everything, and fabricated working with five
        administration narrows. That was 1989. He and his staff have been giving
        master administration and deals from that point forward. Keith
        comprehended that since he was an excellent professional, didn’t mean he
        realized how to adequately maintain a business. Preparing and
        instruction through ASA (Automotive Service Association) cause him to
        consummate his auto benefit office. He’s an additional incentive to his
        fix shop by turning into a great degree educated and able
        businessperson.
      </Typography>
      <br />
      <Box
        sx={{
          marginLeft: 50,
          marginRight: 40,
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{ fontWeight: "bold", border: 1 }}
        >
          Provide us with your details and our team will contact you within
          3hrs.
        </Typography>
        <TextField
          id="standard-basic"
          label="Email address"
          variant="standard"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          sx={{ width: 500 }}
        />
        <hr />
        <TextField
          id="standard-basic"
          label="Contact number"
          variant="standard"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          sx={{ width: 500 }}
        />
        <hr />
        <TextField
          id="standard-basic"
          label="Purpose to contact"
          variant="standard"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          sx={{ width: 500 }}
        />
        <hr />
        <TextField
          id="standard-basic"
          label="Vehicle details(Brand-model-make year)"
          variant="standard"
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          sx={{ width: 500 }}
        />
        <hr />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
};
