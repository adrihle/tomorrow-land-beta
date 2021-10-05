import { iLogin } from './login.page';

export const checkEmptyFields = (login: iLogin): boolean => {
    let error: boolean = false;
    Object.keys(login).forEach((field: string) => {
        if (!login[field as keyof iLogin]){
            error = true;
        }
    })
    return error;
};
