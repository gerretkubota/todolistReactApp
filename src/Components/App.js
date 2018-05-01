import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Todolist from './Todolist';

import './todolist.css';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      users: []
    }
  }
  
  render(){
    return(
      <Router>
        <div className='mainDiv'>
          <h1>To Do List</h1>
          {/* NavigationBar 'Links' to route to the designatedpages */}
          <ul className='header'>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/login'>Log in</NavLink></li>
            <li><NavLink to= '/signup'>Sign up</NavLink></li>
            <li><NavLink to='/todolist'>To do list</NavLink></li>
          </ul>
          {/* Main div that shows the content of the components */}
          <div className='content'>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/todolist' component={Todolist}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;