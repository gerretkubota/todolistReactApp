import React, {Component} from 'react';

import Todolist from './Todolist';

class Signup extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: undefined,
      filled: false
    }

    this.handleCreation = this.handleCreation.bind(this);
  }

  handleCreation = () => {
    this.setState({
      username: this._inputUsername.value,
      password: this._inputPassword.value,
      filled: true
    })
  }
  
  render(){
    if(this.state.filled){
      return(
        <Todolist username={this.state.username}
        />
      )
    }else{
      return(
        <div className='signupStyle'>
          <h2>Sign up</h2>
  
          <p>Sign up page</p>
          <div>
            <form onSubmit={this.handleCreation}>
              <label>Create Usename:</label>
              <br/>
              <input type='text' placeholder='Username' 
                     ref={(input) => {this._inputUsername = input}}
                     required
              />
              <br/><br/>
              <label>Create Password:</label>
              <br/>
              <input type='password' placeholder='Password' 
                     ref={(input) => {this._inputPassword = input}}
                     required
              />
              <br/><br/>
              <button type='submit'>Register</button>
            </form>
          </div>  
        </div>
      )
    }
  }
}

export default Signup;