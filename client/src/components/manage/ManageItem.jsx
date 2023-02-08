import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  CircularProgress,
  useMediaQuery,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import config from "../../api/config.json";
import Swal from "sweetalert2";
import { deleteItem, getAllItems } from "../../api/itemApi";
import { AddItemModal } from "./modal/AddItemModal";
import { UpdateItemModal } from "./modal/UpdateItemModal";

export const ManageItem = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const isMobile = useMediaQuery("(min-width:768px)");
  const [appStatus, setAppStatus] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const generateItems = (status) => {
    let filteredItems = [];
    filteredItems = item.items;
    setFilteredItems(filteredItems);
  };

  useEffect(() => {
    generateItems(appStatus?.label || `All Users`);
  }, [appStatus, item.items]);

  const handleAddItemOpen = () => setOpenAddItem(true);
  const handleAddItemClose = () => setOpenAddItem(false);

  const handleUpdateItemOpen = () => setOpenUpdateItem(true);
  const handleUpdateItemClose = () => setOpenUpdateItem(false);

  return (
    <>
      <AddItemModal open={openAddItem} handleClose={handleAddItemClose} />
      <UpdateItemModal
        open={openUpdateItem}
        handleClose={handleUpdateItemClose}
        item={selectedItem}
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
              Items
            </Typography>
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddItemOpen}
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
          {item.loading ? (
            <Box m={-9.5} marginLeft={80}>
              <CircularProgress value="progress" />
            </Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {filteredItems
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
                  } else if (
                    app.quantity.toString().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.sold.toString().includes(search.toLowerCase())
                  ) {
                    return app;
                  }
                })
                .map((item) => (
                  <MuiCard
                    key={item._id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${config.Backend_URL}${item.image}`}
                      alt="item"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`$ ${item.cost}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Qty: ${item.quantity}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Sold: ${item.sold}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          handleUpdateItemOpen();
                        }}
                      >
                        update
                      </Button>
                      <Button
                        size="small"
                        onClick={async () => {
                          const deletedItem = await deleteItem(item._id);
                          if (deletedItem.success) {
                            const response = await dispatch(getAllItems());
                            if (response.payload) {
                              Swal.fire(
                                "SUCCESS!",
                                "Item Deleted Successfully!",
                                "success"
                              );
                            } else {
                              Swal.fire(
                                "ERROR!",
                                "Unable to Delete Item. Please Try Again!",
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
