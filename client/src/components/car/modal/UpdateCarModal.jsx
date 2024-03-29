import { Button, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { updateCar } from "../../../api/carApi";

export const UpdateCarModal = ({ open, handleClose, _id, carId, car }) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [registration, setRegistration] = useState();
  const [file, setFile] = useState([]);
  useEffect(() => {}, [car]);
  console.log(car);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("name", name);
    formData.append("registration", registration);
    formData.append("userId", _id);
    formData.append("_id", carId);
    const response = await dispatch(updateCar(formData));
    if (response.payload) {
      setFile([]);
      Swal.fire("SUCCESS!", "Car Updated Successfully!", "success");
    } else {
      Swal.fire("ERROR!", "Unable to Update Car. Please Try Again!", "error");
    }
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "auto" : "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="div">
            Update Car
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
              value={car.name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="registration"
              label="Registration"
              name="registration"
              type="text"
              autoComplete="registration"
              value={car.registration}
              onChange={(e) => setRegistration(e.target.value)}
            />
            <input
              margin="normal"
              fullWidth
              id="file"
              label="Image"
              name="file"
              autoComplete="file"
              type="file"
              onChange={(e) => setFile([...file, e.target.files[0]])}
              style={{ marginBottom: "4px" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 0.5 }}
            >
              update
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
