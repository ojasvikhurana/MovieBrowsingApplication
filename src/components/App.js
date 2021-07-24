import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import '../styles/app.css'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
