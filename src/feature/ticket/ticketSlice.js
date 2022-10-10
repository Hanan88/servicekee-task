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
        },
        updateTicket: (state, action) =>{
            state.ticket.map(item => {
                if(item.id == action.payload.id){
                    item.ticketName = action.payload.ticketName
                    item.startDate = action.payload.startDate
                    item.endDate = action.payload.endDate
                    item.description = action.payload.description
                }
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { addTicket, deleteTicket, updateTicket } = ticketSlice.actions

export default ticketSlice.reducer