import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { LoginPage, Dashboard } from './pages';

function App() {
  return (
      <Router>
        <main className='app-container'>
          <Switch>
              <Route path='/dashboard'>
                <Dashboard />
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
