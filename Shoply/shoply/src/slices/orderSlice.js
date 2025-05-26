import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    success : false,
    loading : false,
    error : false
}

export const placeOrder = createAsyncThunk("orders/placeOrder", async ({user, items, shipping}) => {
    try {
        let {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/v1/order/create`, {items, shipping}, {
            headers : {
                authorization : `Bearer ${user.token}`
            }
        } )
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }

    
})

export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async (token) => {
    try {
        let {data} = await axios.get(`${process.env.REACT_APP_API_URL}api/v1/order/`, {
            headers :{
                authorization : `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {

    },
    extraReducers : {
        [placeOrder.pending] : (state, action) => {
            state.loading = true;
        },
        [placeOrder.fulfilled] : (state, action) => {
            state.loading = false;
            // state.orders = [...state.orders, action.payload]
            state.success = true
        },
        [placeOrder.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [fetchAllOrders.pending] : (state, action) => {
            state.loading = true;
        },
        [fetchAllOrders.fulfilled] : (state, action) => {
            state.loading = false;
            state.orders = action.payload
        },
        [fetchAllOrders.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
    }

})



export default orderSlice.reducer;