import { ticketCurrentTypes } from '../types';
import { iTicket } from '../store.interface';

export interface iActionTicketCurrent {
    type: ticketCurrentTypes,
    payload?: iTicket
}

export const actionAddTicketCurrent = (ticket: iTicket): iActionTicketCurrent => {
    return {
        type: 'TICKET_CURRENT_ADD',
        payload: ticket
    }
};

export const actionResetTicketCurrent = (): iActionTicketCurrent => {
    return {
        type: 'TICKET_CURRENT_RESET'
    }
};