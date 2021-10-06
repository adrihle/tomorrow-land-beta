import type { iUserState } from './reducers/user.reducer';
import type { iTicketState } from './reducers/ticket.reducer';
import type { iTicketCurrentState } from './reducers/ticket-current.reducer';

 ;

export interface iReduxStore {
    user: iUserState,
    tickets: iTicketState,
    ticketCurrent: iTicketCurrentState
}

export interface iTicket {
    _id: string;
    ticket: number;
    present: boolean;
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    phone: string;
    address: string;
}