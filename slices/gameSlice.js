import { createSlice } from "@reduxjs/toolkit";
import { gameModes } from "../utils/constants"; 

const initialState = {
    modes: gameModes
}

export const gameSlice = createSlice({
    name:'game',
    initialState,
    reducers: {
        setPointsInMode: (state, action) => {
            state.modes[action.payload.id].points = action.payload.points;
        }
    }
})

export const { setPointsInMode } = gameSlice.actions

export const selectMode = (state) => state.game.modes

export default gameSlice.reducer;