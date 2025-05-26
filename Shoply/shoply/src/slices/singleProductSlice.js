import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product : null,
    loading : false,
    error : false,
}

export const fetchSingleProduct = createAsyncThunk("product/fetchSingleProduct", async (_id) => {
    try {
        let {data} = await axios(`${process.env.REACT_APP_API_URL}api/v1/products/${_id}`);
        return data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

export const createReview = createAsyncThunk('product/createReview', async ({productId, message, rating, token}) => {
    try {
        let {data }= await axios.put(`${process.env.REACT_APP_API_URL}api/v1/products/addReview/${productId}`, {message, rating}, {
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})  

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
           
    },
    extraReducers : {
        [fetchSingleProduct.pending] : (state) => {
            state.loading = true;
        },
        [fetchSingleProduct.fulfilled] : (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false
        },
        [fetchSingleProduct.rejected] : (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.error.message;
        },
        [createReview.pending] : (state) => {
            state.loading = true;
        },
        [createReview.fulfilled] : (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false
        },
        [createReview.rejected] : (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.error.message;
        },
    }
})

export default productSlice.reducer;