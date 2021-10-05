import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { tickets } from './ticket.reducer';

export const rootReducers = combineReducers({
    user,
    tickets
})