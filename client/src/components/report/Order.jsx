import {
  Box,
  Card as MuiCard,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../api/orderApi";

export const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);
  const isMobile = useMediaQuery("(min-width:768px)");
  const [appStatus, setAppStatus] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const status = [
    {
      label: "Cancelled",
      value: 0,
    },
    {
      label: "Placed",
      value: 1,
    },
    {
      label: "All Orders",
      value: 3,
    },
  ];

  const generatOrdersByStatus = (status) => {
    let filteredOrders = [];
    if (status === "Cancelled" || status === "Placed") {
      filteredOrders = order.orders.filter(
        (orderDetails) => orderDetails.status === status
      );
    } else {
      filteredOrders = order.orders;
    }
    setFilteredOrders(filteredOrders);
  };

  useEffect(() => {
    generatOrdersByStatus(appStatus?.label || `All Orders`);
  }, [appStatus, order.orders]);

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
              Orders
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

          {order.loading ? (
            <Box m={-9.5} marginLeft={48}>
              <CircularProgress value="progress" />
            </Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {filteredOrders
                .filter((app) => {
                  if (search === "") {
                    return app;
                  } else if (
                    app.username.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.productName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.price.toString().includes(search.toLowerCase())
                  ) {
                    return app;
                  }
                })

                .map((order) => (
                  <MuiCard
                    key={order._id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {order.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`$ ${order.price}`}
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
