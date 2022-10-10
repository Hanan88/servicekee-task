import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ticket: [],
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        addTicket: (state, action) => {
            console.log(action, state);
            state.ticket.push(action.payload)
        },
        deleteTicket: (state, action) => {
            state.ticket = state.ticket.filter(item => item.id != action.payload.id )
        }
    },
})

// Action creators are generated for each case reducer function
export const { addTicket, deleteTicket } = ticketSlice.actions

export default ticketSlice.reducer