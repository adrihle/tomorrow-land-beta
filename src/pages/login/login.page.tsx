import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { checkEmptyFields } from './login.page.handler';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin, actionResetUser } from '../../redux/actions';
import { iReduxStore } from '../../redux';
import { useHistory } from 'react-router-dom';
import './login.page.style.scss';
import { store as reduxStore } from '../../redux/store.store';
import { SVGComponent } from 'src/components';

export const LoginPage = () => {
    // HOOKS
    const [login, setLogin]=useState<iLogin>(initialLogin);
    const [error, setError]=useState<boolean>(false);
    const state = useSelector((state: iReduxStore) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    // SI HUBIESE UN VOLUMEN MAYOR DE PETICIONES ASINCRONAS LO
    // HARIA CON SAGAS, PERO SOLO DOS, DECIDI POR TIEMPO CONTROLARLAS
    // CON RX Y THUNK
    useEffect(() => {
        dispatch(actionResetUser());
        const unsubscribe = reduxStore.subscribe(() => {
            if (reduxStore.getState().user.auth){
                setLogin(initialLogin);
                history.push('/dashboard');
            }
        });
        return function clean(){
            unsubscribe();
        }
    },[history, dispatch]);

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
        <main className='login-container __pop'>
            <section>
                <div className='login-title'>
                    <SVGComponent type='LOGO' width={100} height={100}/>
                    <h1>Welcome!</h1>
                </div>
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
                        className='__press'
                    >
                        {state.loading ? 'Loading...' : 'Submit Login'}
                    </button>
                </form>
            </section>
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