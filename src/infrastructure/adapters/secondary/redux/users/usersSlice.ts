import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {UserDto} from "./user.dto.ts";

interface UsersState {
    users: UserDto[]
}

const initialState = { users: [] } as UsersState

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<UserDto>) {
            state.users.push(action.payload)
        },
        addUsers(state, action: PayloadAction<UserDto[]>) {
            state.users = action.payload
        },
    },
})

export const { addUser, addUsers } = usersSlice.actions
export default usersSlice.reducer
