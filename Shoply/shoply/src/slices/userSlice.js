import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let localUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: localUser,
  loading: false,
  error: false,
};

export const createUser = createAsyncThunk("user/createUser", async (user) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}api/v1/user/register`,
      user
    );
    if (res.status === 201) {
      let token = res.data.token;
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/cart/createCart`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        return res.data;
      } else {
        throw new Error("Error while creating cart");
      }
    } else {
      throw new Error("Error while registering user");
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}api/v1/user/login`,
      user
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async ({ token }) => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/user/allUser`,
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

export const updateAdmin = createAsyncThunk(
  "user/updateAdmin",
  async ({ token, userId }) => {
    try {
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/v1/user/updateAdmin/${userId}`,
        {},
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ token, userId }) => {
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/v1/user/deleteUser/${userId}`,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.user = null;
      state.loading = false;
    },
    [fetchAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.allUsers = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [updateAdmin.pending]: (state) => {
      state.loading = true;
    },
    [updateAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      let index = state.allUsers.findIndex(
        (user) => user._id === action.payload._id
      );
      state.allUsers.splice(index, 1, action.payload);
    },
    [updateAdmin.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      let index = state.allUsers.findIndex(
        (user) => user._id === action.payload._id
      );
      state.allUsers.splice(index, 1);
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
