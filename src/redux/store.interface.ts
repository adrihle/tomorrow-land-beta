import type { iUserState } from './reducers/user.reducer';
import type { iTicketState } from './reducers/ticket.reducer';
export type { iTicket } from './reducers/ticket.reducer';

 ;

export interface iReduxStore {
    user: iUserState,
    tickets: iTicketState
}