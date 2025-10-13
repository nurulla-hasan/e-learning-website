import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface ProfileState {
  profile: UserProfile | null;
  favoriteRecipes: string[];
}

const initialState: ProfileState = {
  profile: null,
  favoriteRecipes: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SetUserProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
    SetFavoriteRecipes: (state, action: PayloadAction<string[]>) => {
      state.favoriteRecipes = action.payload;
    },
  },
});

export const { SetUserProfile, SetFavoriteRecipes } = profileSlice.actions;
export default profileSlice.reducer;
