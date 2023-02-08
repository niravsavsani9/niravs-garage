import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
const image = {
  paperContainer: {
    backgroundImage: `url(${"https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZ2lufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"})`,
  },
};
export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await dispatch(
      signupUser({
        userName: data.get("email"),
        password: data.get("password"),
        role: "customer",
        name: data.get("name").toLowerCase(),
        contactNumber: data.get("contactNumber"),
      })
    );
    if (response.payload) {
      Swal.fire("SUCCESS!", "User Registered Successfully!", "success");
      navigate("/");
    } else {
      Swal.fire("ERROR!", "User Already Exists. Please try again!", "error");
    }
  };

  return (
    <Paper style={image.paperContainer} sx={{ height: 720, mt: -1 }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: 8,
            marginLeft: -10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", mt: 5 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            {/* <Autocomplete
            margin="normal"
            required
            fullWidth
            id="role"
            disablePortal
            options={roles}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="role"
              />
            )}
          /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactNumber"
              label="Contact Number"
              name="contactNumber"
              autoComplete="contactNumber"
              type="number"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                Already Have an Account <Link to="/login">Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ marginTop: 1 }}
        >
          {`Copyright © Nirav's Garage ${new Date().getFullYear()}`}
        </Typography>
      </Container>
    </Paper>
  );
};
