// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/'
    }),
    endpoints: builder => ({
        getSession: builder.query({
            query: () => '/session',
            providesTags: ['Session'],
        },
        ),
        getDirectMessages: builder.query({
            query: () => '/direct-messages',
            providesTags: ['DirectMessage'],
        }
        ),
        addNewDirectMessage: builder.mutation({
            query: (payload) => ({
                url: '/direct-messages',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['DirectMessage'],
        }),
    })
});

export const selectGetDirectMessagesResult = apiSlice.endpoints.getDirectMessages.select();
export const selectGetSessionResult = apiSlice.endpoints.getSession.select();

export const {
    useAddNewDirectMessageMutation
} = apiSlice;