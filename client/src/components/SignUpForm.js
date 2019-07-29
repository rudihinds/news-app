import React from 'react'
import API from '../adapters/API'

class SignUpForm extends React.Component {
  state = {
    user: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
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
    if (this.state.user.first_name === '') errors.push('The first name cannot be blank')
    if (this.state.user.last_name === '') errors.push('The last name cannot be blank')
    if (this.state.user.email === '') errors.push('The email cannot be blank')
    
    if (errors.length !== 0) {
      this.setState({ errors })
    } else {
      API.signUp(this.state.user).then(data => {
        if (data.errors) this.setState({errors: data.errors})
        if (data.user) this.setState({
          user: {
            username: '',
          first_name: '',
          last_name: '',
          email: '',
          password: ''
          },
          errors: []
        })
      })

    }
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
      <p>Sign up for an account to save your preferences</p>
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        {this.state.errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <div>
          <label htmlFor='username' >Username</label>
          <input type='text' id='username' name='username' required={true} value={this.state.user.username} onChange={(e) => this.handleChange('username', e.target.value)} />
        </div>
        <div>
          <label htmlFor='first_name' >First Name</label>
          <input type='text' id='first_name' name='first_name' required={true} value={this.state.user.first_name} onChange={(e) => this.handleChange('first_name', e.target.value)} />
        </div>
        <div>
          <label htmlFor='last_name' >Last Name</label>
          <input type='text' id='last_name' name='last_name' required={true} value={this.state.user.last_name} onChange={(e) => this.handleChange('last_name', e.target.value)} />
        </div>
        <div>
          <label htmlFor='email' >Email</label>
          <input type='email' id='email' name='email' required={true} value={this.state.user.email} onChange={(e) => this.handleChange('email', e.target.value)} />
        </div>
        <div>
          <label htmlFor='Password'>Password</label>
          <input type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <hr/>
      <p onClick={this.props.handleClick}>If you already have an account, click here to login.</p>
      </div>
    )
  }
}

export default SignUpForm;