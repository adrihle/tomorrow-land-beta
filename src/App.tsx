import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { LoginPage, DashboardPage } from './pages';
import { useSelector } from 'react-redux';
import { iReduxStore } from './redux';

function App() {
  const { auth } = useSelector((state: iReduxStore) => state.user)
  return (
      <Router>
        <main className='app-container'>
          <Switch>
              <Route exact path='/dashboard'>
                {auth ? <DashboardPage /> : <Redirect to='/'/>}
              </Route>
              <Route path='/'>
                <LoginPage />
              </Route>
          </Switch>
        </main>
      </Router>
  );
}

export default App;
