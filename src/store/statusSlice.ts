import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StatusService } from '../services/apiService';


export interface Status {
    id: string;
    name: string;
}

interface StatusState {
    data5: Status[];
    loading5: boolean;
    error5: string | null;
}

const initialState: StatusState = {
    data5: [],
    loading5: false,
    error5: null,
};

export const fetchStatus = createAsyncThunk(
    'status/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await StatusService.getAll();
            return res.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal mengambil data status'
            );
        }
    }
);


const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatus.pending, (state) => {
                state.loading5 = true;
                state.error5 = null;
            })
            .addCase(fetchStatus.fulfilled, (state, action) => {
                state.loading5 = false;
                state.data5 = action.payload;
            })
            .addCase(fetchStatus.rejected, (state, action) => {
                state.loading5 = false;
                state.error5 = action.payload as string;
            });
    },
});

export default statusSlice.reducer;
