import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ZonaService } from '../services/apiService';


export interface Zona {
  id: string;
  name: string;
}

interface ZonaState {
  data3: Zona[];
  loading3: boolean;
  error3: string | null;
}


const initialState: ZonaState = {
  data3: [],
  loading3: false,
  error3: null,
};


export const fetchZona = createAsyncThunk(
  'zona/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await ZonaService.getAll();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal mengambil data zona'
      );
    }
  }
);


export const createZona = createAsyncThunk(
  'zona/create',
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await ZonaService.create(formData);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const updateZona = createAsyncThunk(
  'zona/update',
  async (
    payload: { id: string; formData: FormData },
    thunkAPI
  ) => {
    const { id, formData } = payload;
    try {
      const res = await ZonaService.update(id, formData);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const deleteZona = createAsyncThunk(
  'zona/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await ZonaService.remove(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal menghapus zona'
      );
    }
  }
);


const zonaSlice = createSlice({
  name: 'zona',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchZona.pending, (state) => {
        state.loading3 = true;
        state.error3 = null;
      })
      .addCase(fetchZona.fulfilled, (state, action) => {
        state.loading3 = false;
        state.data3 = action.payload;
      })
      .addCase(fetchZona.rejected, (state, action) => {
        state.loading3 = false;
        state.error3 = action.payload as string;
      })


      .addCase(createZona.fulfilled, (state, action) => {
        state.data3.unshift(action.payload);
      })


      .addCase(updateZona.fulfilled, (state, action) => {
        const index = state.data3.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data3[index] = action.payload;
        }
      })


      .addCase(deleteZona.fulfilled, (state, action) => {
        state.data3 = state.data3.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default zonaSlice.reducer;
