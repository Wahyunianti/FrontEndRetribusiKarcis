import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const token = localStorage.getItem('access_token');

interface AuthState {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (payload: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await api.post('/login', payload);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data.message);
        }
    }
);


export const getProfile = createAsyncThunk(
    'auth/dashboard',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/dashboard');
            return res.data;
        } catch {
            return rejectWithValue('Unauthorized');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('access_token');
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                state.user = action.payload.user;
                localStorage.setItem('access_token', action.payload.access_token);
            })
            .addCase(login.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});


export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
