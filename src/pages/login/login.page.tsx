import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { checkEmptyFields } from './login.page.handler';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin } from '../../redux/actions';
import { iReduxStore } from '../../redux';
import { useHistory } from 'react-router-dom';
import './login.page.style.scss';
import { store as reduxStore } from '../../redux/store.store';

export const LoginPage = () => {
    // HOOKS
    const [login, setLogin]=useState<iLogin>(initialLogin);
    const [error, setError]=useState<boolean>(false);
    const state = useSelector((state: iReduxStore) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    // SI HUBIESE UN VOLUMEN MAYOR DE PETICIONES ASINCRONAS LO
    // HARIA CON SAGAS, PERO SOLO DOS DECIDI POR TIEMPO CONTROLARLAS
    // CON RX Y THUNK
    useEffect(() => {
        const unsubscribe = reduxStore.subscribe(() => {
            if (reduxStore.getState().user.auth){
                setLogin(initialLogin);
                history.push('/dashboard');
                console.warn('login')
            }
        });
        return function clean(){
            unsubscribe();
        }
    },[]);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLogin(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setError(false);
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!checkEmptyFields(login)){
            dispatch(actionLogin(login));
        } else {
            setError(true);
        }
    };

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
                    disabled={state.loading}
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