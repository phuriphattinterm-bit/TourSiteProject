import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type RootState } from './index';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface User {
    id: number,
    username: string,
    admin: boolean,
    token: string
}

interface UserPayload {
    id: number;
    admin: boolean;
}

interface UserState {
    isLoggedin: boolean,
    token: string | null,
    admin: boolean,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    isLoggedin: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    admin: !!localStorage.getItem('admin'),
    loading: false,
    error: null,
}

const API_URL = 'http://localhost:3000/users';

export const login = createAsyncThunk('users/login', async (userInput: { username: string, password: string }) => {
    const response = await axios.post(`${API_URL}/login`, {
        username: userInput.username,
        password: userInput.password
    })

    return response.data
})

export const signUp = createAsyncThunk('users/signUp', async (userInput: { username: string, password: string, email: string }) => {
    const response = await axios.post<User>(API_URL, userInput);
    return response.data
})


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedin = false
            state.token = null
            state.error = null
            state.admin = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedin = true;
                state.token = action.payload.token;
                const decoded = jwtDecode<UserPayload>(action.payload.token)
                state.admin = decoded.admin;
                if (state.admin) {
                    localStorage.setItem('admin', JSON.stringify(true))
                }
                localStorage.setItem('token', action.payload.token);
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Invalid username or password.';
            })


            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })

            .addCase(signUp.fulfilled, (state) => {
                state.loading = false;
            })
    }
})


export const { logout } = userSlice.actions;
export default userSlice.reducer;


export const selectAdmin = (state: RootState) => state.users.admin;
export const selectUsers = (state: RootState) => state.users.isLoggedin;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;