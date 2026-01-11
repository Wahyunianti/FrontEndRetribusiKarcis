import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WajibRetribusiService } from '../services/apiService';


export interface WajibRetribusi {
    id: string;
    name: string;
    keterangan?: string | null;
    zona_id: string;
    zona_name: string;
    status_id: string;
    status_name: string;
    jenis_karcis_id: string;
    jenis_karcis_name: string;
    jenis_karcis_nominal?: number;
    created_at?: string;
}

interface DetailWajibRetribusi {
    jenis_karcis: {
        id: string;
        name: string;
        nominal: number;
    }
}

interface PaginationState {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface WajibRetribusiState {
    data4: WajibRetribusi[];
    detail4: DetailWajibRetribusi | null;
    loading4: boolean;
    error4: string | null;
    pagination: PaginationState | null;
    keyword: string;
}

const initialState: WajibRetribusiState = {
    data4: [],
    detail4: null,
    loading4: false,
    error4: null,
    pagination: null,
    keyword: ''
};


export const fetchWajibRetribusi = createAsyncThunk(
    'wajibRetribusi/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await WajibRetribusiService.getAll();
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal mengambil data wajib retribusi'
            );
        }
    }
);

export const fetchWajibRetribusiName = createAsyncThunk(
    'wajibRetribusi/fetch',
    async (
        { page, keyword }: { page: number; keyword?: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await WajibRetribusiService.getAllName({
                page,
                keyword,
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ||
                'Gagal mengambil data wajib retribusi'
            );
        }
    }
);

export const fetchWajibRetribusiDetail = createAsyncThunk(
    'wajibRetribusi/fetchDetail',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await WajibRetribusiService.getById(id);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal mengambil detail wajib retribusi'
            );
        }
    }
);

export const createWajibRetribusi = createAsyncThunk(
    'wajibRetribusi/create',
    async (payload: FormData, { rejectWithValue }) => {
        try {
            const res = await WajibRetribusiService.create(payload);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal menambahkan wajib retribusi'
            );
        }
    }
);

export const updateWajibRetribusi = createAsyncThunk(
    'wajibRetribusi/update',
    async (
        payload: { id: string; formData: FormData },
        { rejectWithValue }
    ) => {
        try {
            const res = await WajibRetribusiService.update(payload.id, payload.formData);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal memperbarui wajib retribusi'
            );
        }
    }
);

export const deleteWajibRetribusi = createAsyncThunk(
    'wajibRetribusi/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await WajibRetribusiService.remove(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Gagal menghapus wajib retribusi'
            );
        }
    }
);


const wajibRetribusiSlice = createSlice({
    name: 'wajibRetribusi',
    initialState,
    reducers: {
        clearWajibRetribusiDetail: (state) => {
            state.detail4 = null;
            state.data4 = [];
            state.pagination = null;
            state.keyword = '';
        },
        setKeyword(state, action) {
            state.keyword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            /* FETCH ALL */
            .addCase(fetchWajibRetribusi.pending, (state) => {
                state.loading4 = true;
                state.error4 = null;
            })
            .addCase(fetchWajibRetribusi.fulfilled, (state, action) => {
                state.loading4 = false;
                state.data4 = action.payload;
            })
            .addCase(fetchWajibRetribusi.rejected, (state, action) => {
                state.loading4 = false;
                state.error4 = action.payload as string;
            })

            /* FETCH WITH PAGINATION */
            .addCase(fetchWajibRetribusiName.pending, (state) => {
                state.loading4 = true;
                state.error4 = null;
            })
            .addCase(fetchWajibRetribusiName.fulfilled, (state, action) => {
                state.loading4 = false;

                const { data, pagination } = action.payload;

                state.data4 =
                    pagination.current_page === 1
                        ? data
                        : [...state.data4, ...data];

                state.pagination = pagination;
            })
            .addCase(fetchWajibRetribusiName.rejected, (state, action) => {
                state.loading4 = false;
                state.error4 = action.payload as string;
            })

            /* FETCH DETAIL */
            .addCase(fetchWajibRetribusiDetail.fulfilled, (state, action) => {
                state.detail4 = action.payload;
            })

            /* CREATE */
            .addCase(createWajibRetribusi.fulfilled, (state, action) => {
                state.data4.unshift(action.payload);
            })

            /* UPDATE */
            .addCase(updateWajibRetribusi.fulfilled, (state, action) => {
                const index = state.data4.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.data4[index] = action.payload;
                }
            })

            /* DELETE */
            .addCase(deleteWajibRetribusi.fulfilled, (state, action) => {
                state.data4 = state.data4.filter(
                    (item) => item.id !== action.payload
                );
            });
    },
});

export const { clearWajibRetribusiDetail, setKeyword } = wajibRetribusiSlice.actions;
export default wajibRetribusiSlice.reducer;
