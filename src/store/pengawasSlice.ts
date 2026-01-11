import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PengawasService } from '../services/apiService';

/* =======================
   INTERFACE
======================= */
export interface Pengawas {
    id: string;
    name: string;
    nik: string;
    photo_profile?: string | null;
    surat_tugas?: string | null;
    zona_id: string;
    zona_name: string;
    users_id: string;
    created_at?: string;
}

interface PengawasState {
    data2: Pengawas[];
    detail2: Pengawas | null;
    loading2: boolean;
    error2: string | null;
}

/* =======================
   INITIAL STATE
======================= */
const initialState: PengawasState = {
    data2: [],
    detail2: null,
    loading2: false,
    error2: null,
};

/* =======================
   ASYNC THUNK
======================= */

// GET /api/pengawas
export const fetchPengawas = createAsyncThunk(
    'pengawas/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await PengawasService.getAll();
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal mengambil data pengawas'
            );
        }
    }
);

// GET /api/pengawas/{id}
export const fetchPengawasDetail = createAsyncThunk(
    'pengawas/fetchDetail',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await PengawasService.getById(id);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal mengambil detail pengawas'
            );
        }
    }
);

// POST /api/pengawas
export const createPengawas = createAsyncThunk(
    'pengawas/create',
    async (formData: FormData, thunkAPI) => {
        try {
            const res = await PengawasService.create(formData);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// PUT /api/pengawas/{id}
export const updatePengawas = createAsyncThunk(
    'pengawas/update',
    async (
        payload: { id: string; formData: FormData },
        thunkAPI
    ) => {
        const { id, formData } = payload;
        try {
            const res = await PengawasService.update(id, formData);
            return res.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// DELETE /api/pengawas/{id}
export const deletePengawas = createAsyncThunk(
    'pengawas/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await PengawasService.remove(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal menghapus pengawas'
            );
        }
    }
);

/* =======================
   SLICE
======================= */
const pengawasSlice = createSlice({
    name: 'pengawas',
    initialState,
    reducers: {
        clearPengawasDetail: (state) => {
            state.detail2 = null;
        },
    },
    extraReducers: (builder) => {
        builder

            /* FETCH ALL */
            .addCase(fetchPengawas.pending, (state) => {
                state.loading2 = true;
                state.error2 = null;
            })
            .addCase(fetchPengawas.fulfilled, (state, action) => {
                state.loading2 = false;
                state.data2 = action.payload;
            })
            .addCase(fetchPengawas.rejected, (state, action) => {
                state.loading2 = false;
                state.error2 = action.payload as string;
            })

            /* FETCH DETAIL */
            .addCase(fetchPengawasDetail.fulfilled, (state, action) => {
                state.detail2 = action.payload;
            })

            /* CREATE */
            .addCase(createPengawas.fulfilled, (state, action) => {
                state.data2.unshift(action.payload);
            })

            /* UPDATE */
            .addCase(updatePengawas.fulfilled, (state, action) => {
                const index = state.data2.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.data2[index] = action.payload;
                }
            })

            /* DELETE */
            .addCase(deletePengawas.fulfilled, (state, action) => {
                state.data2 = state.data2.filter(
                    (item) => item.id !== action.payload
                );
            });
    },
});

export const { clearPengawasDetail } = pengawasSlice.actions;
export default pengawasSlice.reducer;
