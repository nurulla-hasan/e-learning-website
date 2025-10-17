import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SetAccessToken } from './auth/authSlice';
import { SetUserProfile } from './profile/profileSlice';
import { RootState } from '../store';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://paulina-e-learning-platform.vercel.app/api/v1',

    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth?.accessToken;

        if (token) {
            headers.set('Authorization', `${token}`)
        }
        return headers
    }
})

// Wrap baseQuery to handle 401 globally
const baseQuery: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    const status = result?.error?.status;
    
    if (status === 401 || status === 403) {
        api.dispatch(SetAccessToken(null));
        api.dispatch(SetUserProfile(null));
        localStorage.removeItem("accessToken");
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,

    tagTypes: ["PROFILE", "FAVORITE", "REVIEW", "COURSE", "CATEGORY", "CHECKOUT"],
    endpoints: () => ({})
})