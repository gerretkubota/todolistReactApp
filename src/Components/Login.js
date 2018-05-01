import React, {Component} from 'react';

class Login extends Component{
  render(){
    return(
      <div className='loginStyle'>
        <h2>Log In</h2>

        <p>Log in page</p>
        <div>
          <form>
            <label>Usename:</label>
            <br/>
            <input type='text' placeholder='Username' />
            <br/><br/>
            <label>Password:</label>
            <br/>
            <input type='password' placeholder='Password' />
            <br/><br/>
            <button>Log in</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;