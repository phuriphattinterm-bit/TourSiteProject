import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from './index';

export interface Tour {
    id: number;
    title: string;
    short_description: string;
    long_description: string;
    image_url: string;
    price: number;
    currency: string;
    max_capacity: number;
}

interface TourState {
    tours: Tour[]
    loading: boolean;
    error: string | null;
    
}

const initialState: TourState = {
    tours: [],
    loading: false,
    error: null,
};

const API_URL = 'http://localhost:3000/tours';

export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
    const response = await axios.get<Tour[]>(API_URL);
    return response.data;
});

export const addTour = createAsyncThunk('tours/addTour', async (tour: {
    title: string, short_description: string, long_description: string,
    image_url: string, price: number, currency: string, max_capacity: number
}) => {
    const response = await axios.post<Tour>(API_URL, tour);
    return response.data;
});

export const updateTour = createAsyncThunk('tours/updateTour', async (tour: Tour
) => {
    const response = await axios.put<Tour>(`${API_URL}/${tour.id}`, tour);
    return response.data;
})

export const deleteTour = createAsyncThunk('tours/deleteTour', async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
})

const tourSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTours.fulfilled, (state, action: PayloadAction<Tour[]>) => {
                state.loading = false;
                state.tours = action.payload;
            })

            .addCase(fetchTours.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'failed to fetch tours packages.';
            })

            .addCase(addTour.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(addTour.pending, (state) => {
                state.loading = true;
            })

            .addCase(addTour.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'failed to add tours.'
            })

            .addCase(deleteTour.fulfilled, (state, action) => {
                state.loading = false;
                state.tours = state.tours.filter(tour => tour.id !== action.payload)
            })

            .addCase(deleteTour.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteTour.rejected, (state, action) => {
                state.error = action.error.message || 'failed to delete'
            })

            .addCase(updateTour.fulfilled, (state, action) => {
                state.loading = false;
                state.tours = state.tours.map(tour =>
                    tour.id === action.payload.id ? action.payload : tour
                )
            })

            .addCase(updateTour.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateTour.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'failed to update';
            })
    }
})

export default tourSlice.reducer;

export const selectTours = (state: RootState) => state.tours.tours;
export const selectLoading = (state: RootState) => state.tours.loading;
export const selectError = (state: RootState) => state.tours.error;