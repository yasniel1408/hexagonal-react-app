import {
    Action,
    combineSlices,
    configureStore,
    ThunkAction,
    PreloadedStateShapeFromReducersMapObject
} from '@reduxjs/toolkit'
import UserReduxService from "../users/infrastructure/adapters/secondary/redux/user-redux-service.ts";

// import logger from 'store-logger'


const rootReducer = combineSlices( {
    user: UserReduxService.usersSlice.reducer,
})

export function setupStore(preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) =>
        //   !isInProduction
        //     ? getDefaultMiddleware().concat(logger)
        //     : getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== "production",
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default setupStore();
