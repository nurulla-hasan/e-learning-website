import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  gender?: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileState {
  profile: UserProfile | null;
}

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SetUserProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
  },
});

export const { SetUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
