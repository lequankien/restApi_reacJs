import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import listJobComponent from './components/listJobComponent';
import editJobComponent from './components/editJobComponent';
import addUserComponent from './components/addJobComponent';
function App() {
  return (
    <div className="container">
      <Router>
                  <h1 className="text-center" >React Job Application</h1>
              
        <div className = "row">
                  <Switch>
                    
                      <Route path="/" exact component={listJobComponent} />
                      <Route path="/jobs" component={listJobComponent} />
                      <Route path="/add-job" component={addUserComponent} />
                      <Route path="/edit-Job" component={editJobComponent} />
                  </Switch>
                  </div> 
      </Router>
    </div>
  );
}

export default App;
