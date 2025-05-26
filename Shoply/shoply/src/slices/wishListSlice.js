import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  wishList: null,
  loading: false,
  error: false,
};

export const clearwishList = createAsyncThunk("wishList/clearWishlist", async (token) => {
  try {
    let {data} = await axios.put(`${process.env.REACT_APP_API_URL}api/v1/wishlist/clearWishlist`,{}, {
      headers : {
        authorization : `Bearer ${token}`,
      }
    })
    return data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
});

export const fetchWishListItems = createAsyncThunk(
  "wishlist/fetchWishListItems",
  async (token) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}api/v1/wishlist`, {
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

export const removeFromWishList = createAsyncThunk(
  "wishlist/removeFromWishList",
  async ({ productId, token }) => {
    try {
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/v1/wishlist/delete/${productId}`,
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

export const addToWishList = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ token, product }) => {
    try {
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/v1/wishlist/addToWishlist`,
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

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: {
    [addToWishList.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [addToWishList.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.wishList = action.payload;
    },
    [addToWishList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.wishList = null;
    },
    [fetchWishListItems.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchWishListItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.wishList = action.payload;
    },
    [fetchWishListItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.wishList = null;
    },
    [removeFromWishList.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [removeFromWishList.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      const index = state.wishList.items.findIndex(
        (item) => item.productId === action.payload
      );
      state.wishList.items.splice(index, 1);
    },
    [removeFromWishList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.wishList = null;
    },

  },
});

export default wishListSlice.reducer;
// export const {clearwishList} = cartSlice.actions







