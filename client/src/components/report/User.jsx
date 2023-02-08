import {
  Box,
  Card as MuiCard,
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
import { fetchUsers } from "../../api/userApi";

export const User = () => {
  const dispatch = useDispatch();
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
    if (status === "Admin" || status === "Customer" || status === "Mechanic") {
      filteredUsers = user.users.filter(
        (userDetails) => userDetails.role.toLowerCase() === status.toLowerCase()
      );
    } else {
      filteredUsers = user.users;
    }
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    generateUsersByStatus(appStatus?.label || `All Users`);
  }, [appStatus, user.users]);

  return (
    <>
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
            <Box m={-9.5} marginLeft={48}>
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
                      <Typography gutterBottom variant="h5" component="div">
                        Name : {user.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        Email id : {user.userName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Role : {user.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Mo. : {user.contactNumber}
                      </Typography>
                    </CardContent>
                  </MuiCard>
                ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};
