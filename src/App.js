import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import {AuthProvider} from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Container 
        className="container d-flex align-items-center justify-content-center"
        style={{minHeight:'100vh'}}
      >
        <div className="w-100" style={{maxWidth:'400px'}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={LogIn}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
