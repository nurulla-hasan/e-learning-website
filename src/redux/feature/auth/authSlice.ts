import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  userRole: string | null;
}

const initialState: AuthState = {
  accessToken: typeof window !== 'undefined' ? localStorage.getItem("accessToken") || null : null,
  userRole: typeof window !== 'undefined' ? localStorage.getItem("userRole") || null : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },

    SetUserRole: (state, action: PayloadAction<string | null>)=>{
      state.userRole = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.userRole = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
    },
  },
});

export const { SetAccessToken, logout, SetUserRole } = authSlice.actions;
export default authSlice.reducer;
