import { iActionTicketCurrent } from '../actions';
import { iTicket } from '../store.interface';

export interface iTicketCurrentState {
    ticket: iTicket | null,
    show: boolean,
    error?: boolean
};

const initialTicketCurrentState: iTicketCurrentState = {
    ticket: null,
    show: false,
    error: false
};

export const ticketCurrent = 
    (state = initialTicketCurrentState, action: iActionTicketCurrent): iTicketCurrentState => {
        switch(action.type){
            case 'TICKET_CURRENT_ADD': {
                return {
                    show: true,
                    ticket: action.payload ? action.payload : null,
                    error: action.payload === null
                }
            }
            case 'TICKET_CURRENT_RESET': {
                return initialTicketCurrentState
            }
            default: return state
        }
}