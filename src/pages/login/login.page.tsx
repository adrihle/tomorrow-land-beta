import { ChangeEvent, FormEvent, useState } from 'react';
import { checkEmptyFields } from './login.page.handler';
import { useDispatch, useSelector } from 'react-redux';
import { 
    actionFailureUser,
    actionRequestUser, 
    actionSuccessUser,
    actionResetUser
} from '../../redux/actions';
import { environment as env } from 'src/environment/environment';
import { iReduxStore } from '../../redux';
import { useHistory } from 'react-router-dom';
import './login.page.style.scss';
import axios from 'axios';

export const LoginPage = () => {
    const [login, setLogin]=useState<iLogin>(initialLogin);
    const [error, setError]=useState<boolean>(false);
    const state = useSelector((state: iReduxStore) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLogin(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setError(false);
        dispatch(actionResetUser());
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!checkEmptyFields(login)){
            dispatch(actionRequestUser());
            axios.post(env.logiUrl, login, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((res) => {
                    dispatch(actionSuccessUser(res.data));
                    setLogin(initialLogin);
                    history.push('/dashboard');
                })
                .catch((err) => {
                    console.error(err)
                    dispatch(actionFailureUser(err));
                });
        } else {
            setError(true);
        }
    }

    return (
        <main className='login-container'>
            <h1 className='login-title'>Login Page</h1>
            <form onSubmit={onSubmit} className='login-form'>
                <input 
                    autoFocus
                    type="text" 
                    placeholder='Username'
                    id='login-input-username'
                    name='username'
                    value={login.username}
                    onChange={onChange}
                />
                <input 
                    type='password' 
                    placeholder='Password'
                    id='login-input-password'
                    name='password'
                    value={login.password}
                    onChange={onChange}
                />
                {state.error && <p className='login-error'>Ups, invalid login</p>}
                {error && <p className='login-error'>Ups, login must be filled!</p>}
                <button 
                    id='login-btn'
                    type='submit'
                >
                    {state.loading ? 'Loading...' : 'Submit Login'}
                </button>
            </form>
        </main>
    )
};

export interface iLogin {
    username: string;
    password: string;
};

const initialLogin: iLogin = {
    username: '',
    password: ''
};