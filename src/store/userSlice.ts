import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../services/apiService';

/* =======================
   INTERFACE
======================= */
export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

interface UserState {
  data: User[];
  detail: User | null;
  loading: boolean;
  error: string | null;
}

/* =======================
   INITIAL STATE
======================= */
const initialState: UserState = {
  data: [],
  detail: null,
  loading: false,
  error: null,
};

/* =======================
   ASYNC THUNK
======================= */

// GET /api/users
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserService.getAll();
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal mengambil data user'
      );
    }
  }
);

// GET /api/users/{id}
export const fetchUserDetail = createAsyncThunk(
  'users/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await UserService.getById(id);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal mengambil detail user'
      );
    }
  }
);

// POST /api/users
export const createUser = createAsyncThunk(
  'users/create',
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await UserService.create(payload);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal menambahkan user'
      );
    }
  }
);

// PUT /api/users/{id}
export const updateUser = createAsyncThunk(
  'users/update',
  async (
    payload: { id: string; name: string; email: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await UserService.update(payload.id, payload);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal memperbarui user'
      );
    }
  }
);

// DELETE /api/users/{id}
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await UserService.remove(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal menghapus user'
      );
    }
  }
);

/* =======================
   SLICE
======================= */
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserDetail: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH ALL */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* FETCH DETAIL */
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
      })

      /* CREATE */
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })

      /* UPDATE */
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { clearUserDetail } = userSlice.actions;
export default userSlice.reducer;
