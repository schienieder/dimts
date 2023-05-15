import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import dataSlice from "./dataSlice"


export const store = configureStore({
    reducer: {
        authState : authSlice,
        dataState : dataSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch