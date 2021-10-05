import { createStore, applyMiddleware } from 'redux';
import { rootReducers } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

export const store = createStore(rootReducers, composeWithDevTools(
    applyMiddleware(thunk)
));

export const ReduxProvider = ({children}: iProps): JSX.Element => {
    return (
        <Provider store={store}>
            {Array.isArray(children) ? children.map(child => child) : children}
        </Provider>
    )
}

interface iProps {
    children: JSX.Element | JSX.Element[];
}