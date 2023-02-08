import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Stack,
  Typography,
  TextField,
  useMediaQuery,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteUser, fetchUsers } from "../../api/userApi";
import { UpdateUserModal } from "./modal/UpdateUserModal";

export const ManageUser = () => {
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState({});
  const { user } = useSelector((state) => state);
  const isMobile = useMediaQuery("(min-width:768px)");
  const [appStatus, setAppStatus] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const status = [
    {
      label: "Admin",
      value: 0,
    },
    {
      label: "Customer",
      value: 1,
    },
    {
      label: "Mechanic",
      value: 2,
    },
    {
      label: "All Users",
      value: 3,
    },
  ];

  const generateUsersByStatus = (status) => {
    let filteredUsers = [];
    if (status === "Admin" || status === "customer" || status === "mechanic") {
      filteredUsers = user.users.filter(
        (userDetails) => userDetails.status === status
      );
    } else {
      filteredUsers = user.users;
    }
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    generateUsersByStatus(appStatus?.label || `All Users`);
  }, [appStatus, user.users]);

  const handleUpdateUserOpen = () => setOpenUpdateUser(true);
  const handleUpdateUserClose = () => setOpenUpdateUser(false);

  return (
    <>
      <UpdateUserModal
        open={openUpdateUser}
        handleClose={handleUpdateUserClose}
        user={selectedUser}
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
              Users
            </Typography>
            <Box w="100%" h="100%" />
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
            <Autocomplete
              margin="normal"
              required
              fullWidth
              id="status"
              disablePortal
              options={status}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                />
              )}
              value={appStatus}
              onChange={(event, newValue) => setAppStatus(newValue)}
            />
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
          {user.loading ? (
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
                    app.userName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.role.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (app.name.includes(search)) {
                    return app;
                  } else if (
                    app.contactNumber.toString().includes(search.toLowerCase())
                  ) {
                    return app;
                  }
                })
                .map((user) => (
                  <MuiCard
                    key={user._id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Name : {user.name}
                      </Typography>
                      <Typography variant="h6" component="div">
                        Email id : {user.userName}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Role : {user.role}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Contact Number : {user.contactNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedUser(user);
                          handleUpdateUserOpen();
                        }}
                      >
                        update
                      </Button>
                      <Button
                        size="small"
                        onClick={async () => {
                          const deletedUser = await deleteUser(user._id);
                          if (deletedUser.success) {
                            const response = await dispatch(fetchUsers());
                            if (response.payload) {
                              Swal.fire(
                                "SUCCESS!",
                                "User Deleted Successfully!",
                                "success"
                              );
                            } else {
                              Swal.fire(
                                "ERROR!",
                                "Unable to Delete User. Please Try Again!",
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
