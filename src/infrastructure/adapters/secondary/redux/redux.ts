import {
    Action,
    combineSlices,
    configureStore,
    ThunkAction,
    PreloadedStateShapeFromReducersMapObject
} from '@reduxjs/toolkit'

// import logger from 'redux-logger'

import usersSlice from "./users/usersSlice.ts";

const rootReducer = combineSlices( {
    user: usersSlice,
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
