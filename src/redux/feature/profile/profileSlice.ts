import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
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
