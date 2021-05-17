import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Characterdetails from './Components/CharacterDetails';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch> 
        <Route exact path="/" component={App}/>
        <Route path="/details/:id" component={Characterdetails}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

