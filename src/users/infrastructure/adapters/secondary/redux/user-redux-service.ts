import {SlicePort} from "../../../../domain/ports/secondary/slice-port.ts";
import {UserDto} from "../user.dto.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../../../../../store/hooks.ts";

interface UsersState {
    users: UserDto[]
}

class UserReduxService implements SlicePort {
    initialState = { users: [] } as UsersState;
    name = 'users';
    reducers = {
        addUser(state: any, action: PayloadAction<UserDto>) {
            state.users.push(action.payload)
        },
        addUsers(state: any, action: PayloadAction<UserDto[]>) {
            state.users = action.payload
        },
    };
    usersSlice;

    constructor() {
        this.usersSlice = createSlice({
            name: this.name,
            initialState: this.initialState,
            reducers: this.reducers,
        })
    }
    addUser(data: UserDto) {
       return this.usersSlice.actions.addUser(data)
    }
    addUsers(data: UserDto[]) {
        return this.usersSlice.actions.addUsers(data)
    }
    getState() {
        const state = useAppSelector((state: any) => state.user);
        return state.users;
    }
}

export default new UserReduxService();
