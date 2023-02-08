import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  TextField,
  useMediaQuery,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getAllServices } from "../../api/serviceApi";
import config from "../../api/config.json";
import { AddServiceModal } from "./modal/AddServiceModal";
import { UpdateServiceModal } from "./modal/UpdateServiceModal";
import Swal from "sweetalert2";

export const ManageService = () => {
  const dispatch = useDispatch();
  const { service } = useSelector((state) => state);
  const [openAddService, setOpenAddService] = useState(false);
  const [openUpdateService, setOpenUpdateService] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const isMobile = useMediaQuery("(min-width:768px)");
  const [appStatus, setAppStatus] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  const generateUsersByStatus = (status) => {
    let filteredUsers = [];
    filteredUsers = service.services;
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    generateUsersByStatus(appStatus?.label || `All Users`);
  }, [appStatus, service.services]);

  const handleAddServiceOpen = () => setOpenAddService(true);
  const handleAddServiceClose = () => setOpenAddService(false);

  const handleUpdateServiceOpen = () => setOpenUpdateService(true);
  const handleUpdateServiceClose = () => setOpenUpdateService(false);

  return (
    <>
      <AddServiceModal
        open={openAddService}
        handleClose={handleAddServiceClose}
      />
      <UpdateServiceModal
        open={openUpdateService}
        handleClose={handleUpdateServiceClose}
        service={selectedService}
      />
      <Stack width="100%" height="100%" alignItems="center" gap={1}>
        <Stack width="100%" height="100%" alignItems="center" gap={1}>
          <Stack
            width="100%"
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box w="100%" h="100%" />
            <Typography variant="h4" color="text.Primary">
              Services
            </Typography>
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddServiceOpen}
            />
          </Stack>
          <Stack
            width={isMobile ? "50%" : "100%"}
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Box w="100%" h="100%" />

            <TextField
              margin="normal"
              required
              fullWidth
              id="search"
              label="Search"
              name="search"
              autoComplete="search"
              value={search}
              onChange={(e) => {
                console.log(e.target.value);
                setSearch(e.target.value);
              }}
            />
            <Box w="100%" h="100%" />
          </Stack>
          {service.loading ? (
            <Box m={-9.5} marginLeft={80}>
              <CircularProgress value="progress" />
            </Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {filteredUsers
                .filter((app) => {
                  if (search === "") {
                    return app;
                  } else if (
                    app.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.description.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.cost.toString().includes(search.toLowerCase())
                  ) {
                    return app;
                  }
                })
                .map((service) => (
                  <MuiCard
                    key={service._id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${config.Backend_URL}${service.image}`}
                      alt="service"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`$ ${service.cost}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedService(service);
                          handleUpdateServiceOpen();
                        }}
                      >
                        update
                      </Button>
                      <Button
                        size="small"
                        onClick={async () => {
                          const deletedService = await deleteService(
                            service._id
                          );
                          if (deletedService.success) {
                            const response = await dispatch(getAllServices());
                            if (response.payload) {
                              Swal.fire(
                                "SUCCESS!",
                                "Service Deleted Successfully!",
                                "success"
                              );
                            } else {
                              Swal.fire(
                                "ERROR!",
                                "Unable to Delete Service. Please Try Again!",
                                "error"
                              );
                            }
                          }
                        }}
                      >
                        delete
                      </Button>
                    </CardActions>
                  </MuiCard>
                ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};
