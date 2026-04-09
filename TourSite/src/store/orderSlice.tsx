import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { type RootState } from "./index";

const API_URL = 'http://localhost:3000/orders'

export interface Order {
    id: number;
    tour_name: string;
    date: string;
    hotel_name: string;
    guest_number: number;
}

interface OrderState {
    orders: Order[],
    loading: boolean,
    error: string | null

}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
}

export const addOrder = createAsyncThunk('orders/addOrder', async (userInput: {
    tour_name: string,
    date: string,
    hotel_name: string,
    guest_number: number
}) => {
    const response = await axios.post(API_URL, userInput)
    return response.data;
})

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get<Order[]>(API_URL);
    return response.data;
})

export const updateOrders = createAsyncThunk('orders/updateOrder', async (order: Order) => {
    const response = await axios.put(`${API_URL}/${order.id}`, order)
    return response.data;
})

export const deleteOrders = createAsyncThunk('orders/deleteOrders', async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
})

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'fail to add order';
            })

            .addCase(addOrder.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })

            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'failed to fetch orders';
            })

            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.payload)
            })

            .addCase(deleteOrders.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message || 'failed to delete orders';
            })

            .addCase(deleteOrders.pending, (state) => {
                state.loading = false;
            })

            .addCase(updateOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            })

            .addCase(updateOrders.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'failed to update';
            })
    },

}
)

export default orderSlice.reducer;

export const selectOrder = (state: RootState) => state.orders.orders;