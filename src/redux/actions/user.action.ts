import { userTypes } from '../types';
import { iLogin } from '../../pages/login/login.page';
import { environment as env } from 'src/environment/environment';
import axios from 'axios';
import { Action, Dispatch } from 'redux';

export interface iActionUser {
    type: userTypes,
    payload?: any
}

export const actionRequestUser = (): iActionUser => {
    return {
        type: 'LOGIN_REQUEST',
    }
};

export const actionSuccessUser = (userData: any): iActionUser => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userData
    }
};

export const actionFailureUser = (error: any): iActionUser => {
    return {
        type: 'LOGIN_FAILED',
        payload: error
    }
};

export const actionResetUser = (): iActionUser => {
    return {
        type: 'LOGIN_RESET',
    }
};

export const actionLogin = (login: iLogin) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(actionRequestUser());
        return axios.post(env.logiUrl, login, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((res) => {
                dispatch(actionSuccessUser(res.data));
            })
            .catch((err) => {
                console.error(err)
                dispatch(actionFailureUser(err));
            });

    }
}