import { configureStore } from "@reduxjs/toolkit"; 
import gameReducer from './slices/gameSlice'

export const store = configureStore({
    reducer: {
        game: gameReducer
    }
})