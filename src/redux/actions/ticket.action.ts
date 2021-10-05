import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { environment as env } from 'src/environment/environment';
import { ticketTypes } from '../types';

export interface iActionTicket {
    type: ticketTypes,
    payload?: any
}

export const actionRequestTickets = (): iActionTicket => {
    return {
        type: 'TICKET_REQUEST'
    }
};

export const actionSuccessTickets = (tickets: any): iActionTicket => {
    return {
        type: 'TICKET_SUCCESS',
        payload: tickets
    }
};

export const actionFailureTickets = (error: any): iActionTicket => {
    return {
        type: 'TICKET_FAILED',
        payload: error
    }
};

export const actionResetTickets = (): iActionTicket => {
    return {
        type: 'TICKET_RESET'
    }
};

export const actionFetchTickets = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(actionRequestTickets());
        return axios.get(env.ticketsUrl)
            .then((res: any) => {
                dispatch(actionSuccessTickets(res.data));
            })
            .catch(err => {
                console.error(err);
                dispatch(actionFailureTickets(err));
            })
    }
}