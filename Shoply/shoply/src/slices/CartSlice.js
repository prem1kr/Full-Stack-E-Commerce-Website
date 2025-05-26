import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const calculateQty = (arr) => {
  return arr?.reduce((qty, item) => qty + item.qty, 0);
};
const calculateAmount = (arr) => {
  return arr?.reduce((amount, item) => item.qty * item.price + amount, 0);
};

const initialState = {
  cart: null,
  loading: false,
  error: false,
  totalQty: 0,
  totalAmount: 0,
};

export const clearCart = createAsyncThunk("cart/clearCart", async (token) => {
  try {
    let {data} = await axios.put(`${process.env.REACT_APP_API_URL}api/v1/cart/clearCart`,{}, {
      headers : {
        authorization : `Bearer ${token}`,
      }
    })
    return data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
});

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (token) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}api/v1/cart`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, token }) => {
    try {
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/v1/cart/delete/${productId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return productId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ token, product }) => {
    try {
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/v1/cart/addToCart`,
        product,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.cart = action.payload;
      state.totalQty = calculateQty(action.payload?.items);
      state.totalAmount = calculateAmount(action.payload?.items);
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.cart = null;
    },
    [fetchCartItems.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.cart = action.payload;
      state.totalQty = calculateQty(action.payload?.items);
      state.totalAmount = calculateAmount(action.payload?.items);
    },
    [fetchCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.cart = null;
    },
    [removeFromCart.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      const index = state.cart.items.findIndex(
        (item) => item.productId === action.payload
      );
      state.cart.items.splice(index, 1);
      state.totalQty = calculateQty(state.cart.items);
      state.totalAmount = calculateAmount(state.cart.items);
    },
    [removeFromCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.cart = null;
    },
    [clearCart.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [clearCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.cart = action.payload
      state.totalQty = 0;
      state.totalAmount = 0;
    },
    [clearCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default cartSlice.reducer;
// export const {clearCart} = cartSlice.actions
