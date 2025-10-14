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
  },
});

export const { SetAccessToken, SetRegisterData } = authSlice.actions;
export default authSlice.reducer;
