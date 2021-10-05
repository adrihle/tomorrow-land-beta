import { iActionUser } from '../actions';

export interface iUserState {
    name: string;
    surname: string;
    birthday: Date;
    auth: boolean;
    error?: string;
    loading: boolean;
};

const initialUserState: iUserState = {
    name: '',
    surname: '',
    birthday: new Date(),
    auth: false,
    loading: false
};

export const user = (state = initialUserState, action: iActionUser): iUserState => {
    switch(action.type){
        case 'LOGIN_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'LOGIN_FAILED': {
            return {
                ...state,
                error: 'Invalid credentials',
                auth: false,
                loading: false,
            }
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                auth: true,
                name: action.payload.name,
                surname: action.payload.surname,
                birthday: action.payload.birthday,
                loading: false,
                error: ''
            }
        }
        case 'LOGIN_RESET': {
            return {
                ...initialUserState
            }
        }
        default: return state
    }
};