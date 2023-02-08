import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders, getOrdersByUserId } from "../../api/orderApi";

const initialState = {
  loading: false,
  orders: [],
  error: ``,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.error.message;
    });
    builder.addCase(getOrdersByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrdersByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    });
    builder.addCase(getOrdersByUserId.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;