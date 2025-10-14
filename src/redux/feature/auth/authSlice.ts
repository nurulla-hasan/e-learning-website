import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  registerData: Record<string, unknown> | null;
}

const initialState: AuthState = {
  accessToken: typeof window !== 'undefined' ? localStorage.getItem("accessToken") || null : null,
  registerData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    SetRegisterData: (state, action: PayloadAction<Record<string, unknown> | null>) => {
      state.registerData = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.registerData = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { SetAccessToken, SetRegisterData, logout } = authSlice.actions;
export default authSlice.reducer;
