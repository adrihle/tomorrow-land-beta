import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { tickets } from './ticket.reducer';
import { ticketCurrent } from './ticket-current.reducer';

export const rootReducers = combineReducers({
    user,
    tickets,
    ticketCurrent
})