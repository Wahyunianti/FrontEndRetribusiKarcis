import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TransaksiService } from '../services/apiService';


export interface Transaksi {
    id: string;
    wajib_retribusi_id: string;
    url_document?: string | null;
    created_at?: string;

    wajib_retribusi: {
        id: string;
        name: string;
        zona?: {
            id: string;
            name: string;
        };
        status?: {
            id: string;
            name: string;
        };
        jenis_karcis?: {
            id: string;
            name: string;
            nominal?: number;
        };
    };
}

interface PaginationState {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface TransaksiState {
    data6: Transaksi[];
    loading6: boolean;
    error6: string | null;
    pagination: PaginationState | null;
}


const initialState: TransaksiState = {
    data6: [],
    loading6: false,
    error6: null,
    pagination: null,
};


export const fetchTransaksi = createAsyncThunk(
    'transaksi/fetch',
    async (
        { page = 1, search = '', month = '', year = '' }: { page?: number, search?: string, month?: string, year?: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await TransaksiService.getAll({ page, search, month, year });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal mengambil data transaksi'
            );
        }
    }
);

export const createTransaksi = createAsyncThunk(
    'transaksi/create',
    async (payload: FormData, { rejectWithValue }) => {
        try {
            const res = await TransaksiService.create(payload);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal menambahkan transaksi'
            );
        }
    }
);

export const deleteTransaksi = createAsyncThunk(
    'transaksi/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await TransaksiService.remove(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal menghapus transaksi'
            );
        }
    }
);


const transaksiSlice = createSlice({
    name: 'transaksi',
    initialState,
    reducers: {
        clearTransaksi: (state) => {
            state.data6 = [];
            state.pagination = null;
            state.error6 = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchTransaksi.pending, (state) => {
                state.loading6 = true;
                state.error6 = null;
            })
            .addCase(fetchTransaksi.fulfilled, (state, action) => {
                state.loading6 = false;
                const newData = Array.isArray(action.payload) ? action.payload : (action.payload?.data || []);
                if (action.meta.arg.page === 1) {
                    state.data6 = newData;
                } else {
                    state.data6 = [...state.data6, ...newData];
                }
            })
            .addCase(fetchTransaksi.rejected, (state, action) => {
                state.loading6 = false;
                state.error6 = action.payload as string;
            })
            
            .addCase(createTransaksi.pending, (state) => {
                state.loading6 = true;
            })
            .addCase(createTransaksi.fulfilled, (state, action) => {
                state.loading6 = false;
                state.data6.unshift(action.payload);
            })
            .addCase(createTransaksi.rejected, (state, action) => {
                state.loading6 = false;
                state.error6 = action.payload as string;
            })

            .addCase(deleteTransaksi.pending, (state) => {
                state.loading6 = true;
            })
            .addCase(deleteTransaksi.fulfilled, (state, action) => {
                state.loading6 = false;
                state.data6 = state.data6.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(deleteTransaksi.rejected, (state, action) => {
                state.loading6 = false;
                state.error6 = action.payload as string;
            });
    },
});

export const { clearTransaksi } = transaksiSlice.actions;
export default transaksiSlice.reducer;
