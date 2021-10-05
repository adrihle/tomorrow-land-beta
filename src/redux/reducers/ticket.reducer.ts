import { iActionTicket } from '../actions';

export interface iTicket {
    id: string;
    ticket: number;
    present: boolean;
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    phone: string;
    address: string;
}

export interface iTicketState {
    tickets: iTicket[];
    loading: boolean;
    error?: boolean; 
}



const initialTicketState: iTicketState = {
    loading: false,
    error: false,
    tickets: []
};

export const tickets = (state = initialTicketState, action: iActionTicket): iTicketState => {
    switch(action.type){
        case 'TICKET_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'TICKET_FAILED': {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case 'TICKET_SUCCESS': {
            return {
                ...state,
                loading: false,
                error: false,
                tickets: action.payload
            }
        }
        case 'TICKET_RESET': {
            return initialTicketState
        }
        default: return state
    }
}
