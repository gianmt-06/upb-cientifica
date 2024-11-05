import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CounterState {
    value: number
    isAdmin: boolean
    usedStorage: number,
}

const initialState: CounterState = {
    value: 0,
    isAdmin: false,
    usedStorage: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented: state => {
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload
        },
        setUsedStorage: (state, action: PayloadAction<number>) => {
            state.usedStorage = action.payload
        },
        updateUsedStorage: (state, action: PayloadAction<number>) => {
            state.usedStorage += action.payload
        }
    }
})

export const { incremented, decremented, incrementByAmount, setIsAdmin, setUsedStorage, updateUsedStorage } = counterSlice.actions

export default counterSlice.reducer
