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
        },
        setSavedModes: (state, action) => {
            state.modes = action.payload;
        },
        setSelectMode: (state, action) => {
            state.modes.forEach((mode, i)=>{
                if(i===action.payload){
                    state.modes[i].select = true;
                }
                else {
                    state.modes[i].select = false;
                }
            })
        }
    }
})

export const { setPointsInMode, setSelectMode, setSavedModes } = gameSlice.actions

export const selectMode = (state) => state.game.modes

export default gameSlice.reducer;