import {
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
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/authApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const image = {
  paperContainer: {
    backgroundImage: `url(${"https://images.unsplash.com/photo-1483354483454-4cd359948304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"})`,
  },
};

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await dispatch(
      loginUser({
        userName: data.get("email"),
        password: data.get("password"),
      })
    );

    if (response.payload) {
      console.log(response);
      if (response.payload.user.role === "admin") {
        Swal.fire("SUCCESS!", "Admin Logged In Successfully!", "success");
        navigate("/manage");
      } else if (response.payload.user.role === "mechanic") {
        Swal.fire("SUCCESS!", "Mechanic Logged In Successfully!", "success");
        navigate("/appointment");
      } else if (response.payload.user.role === "customer") {
        Swal.fire("SUCCESS!", "Customer Logged In Successfully!", "success");
        navigate("/");
      }
    } else {
      Swal.fire("ERROR!", "User Not Found. Please try again!", "error");
    }
  };

  return (
    <Paper style={image.paperContainer} sx={{ height: 720, mt: -1 }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", mt: 13 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                Don't Have an Account <Link to="/signup">Signup</Link>
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
