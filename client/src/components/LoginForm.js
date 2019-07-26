import React from 'react'
import { Link } from 'react-router-dom';

class SignIn extends React.Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    errors: []
  }

  handleChange = (key, value) => {
    this.setState({user: {...this.state.user, [key]: value}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (this.state.user.username === '') errors.push('The username cannot be blank')
    if (this.state.user.password === '') errors.push('The password cannot be blank')

    if (errors.length === 0) {
      this.setState({
        user: {
          username: '',
          password: ''
        },
        errors: []
      })
      
      console.log(this.state.user)
    } else {
      this.setState({ errors })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>
        {this.state.errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <div>
          <label htmlFor='username' >Username</label>
          <input type='text' id='username' name='username' required={true} value={this.state.user.username} onChange={(e) => this.handleChange('username', e.target.value)} />
        </div>
        <div>
          <label htmlFor='Password'>Password</label>
          <input type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
        <hr/>
        <p>If you do not already have an account, click <Link to="/signup" >here</Link> to sign up.</p>
      </form>
    )
  }
}

export default SignIn;