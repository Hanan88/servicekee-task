import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from '../feature/ticket/ticketSlice'

export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
  },
})