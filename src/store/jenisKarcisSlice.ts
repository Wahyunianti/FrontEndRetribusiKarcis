import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { JenisKarcisService } from '../services/apiService';

export interface JenisKarcis {
  id: number;
  name: string;
  jumlah: number;
  nominal: number;
  nomor_seri: string;
  total_lembar: number
}

interface JenisKarcisState {
  data: JenisKarcis[];
  detail: JenisKarcis | null;
  loading: boolean;
  error: string | null;
}

const initialState: JenisKarcisState = {
  data: [],
  detail: null,
  loading: false,
  error: null,
};


export const fetchJenisKarcis = createAsyncThunk(
  'jenisKarcis/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await JenisKarcisService.getAll();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Gagal mengambil data');
    }
  }
);

const jenisKarcisSlice = createSlice({
  name: 'jenisKarcis',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJenisKarcis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJenisKarcis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJenisKarcis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearDetail } = jenisKarcisSlice.actions;
export default jenisKarcisSlice.reducer;
