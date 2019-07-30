import React from 'react'
import API from './adapters/API'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Sidebar from './components/Sidebar';
import UserSources from './components/UserSources';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

class App extends React.Component{

  state = {
    loggedIn: false,
    showModal: true,
    modalLogin: false
  }
  
  componentDidMount(){
    API.validateUser().then(user => {
      if (!user.error && user.id) this.setState({loggedIn: true, showModal: false})
    })
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});
  toggleLogin = () => this.setState({modalLogin: !this.state.modalLogin});

  userLogOut = () => {
    API.clearToken();
    this.setState({ loggedIn: false})
  }

  userLogIn = () => this.setState({ loggedIn: true})

  render(){
    console.log(this.props)
    return (
      <div>
        <CssBaseline />
        <BrowserRouter>
        <div id='modal-to-top' >
          <Dialog
              open={this.state.showModal && !this.state.loggedIn}
              onClose={this.toggleModal}
            >
              {this.state.modalLogin ? 
                <SignUpForm handleClick={this.toggleLogin} toggleModal={this.toggleModal} handleSignUp={this.userLogIn} /> 
              : 
                <LoginForm handleClick={this.toggleLogin} toggleModal={this.toggleModal} handleLogIn={this.userLogIn} />
              }
          </Dialog>
        </div>
        <Navbar showLogin={!this.state.loggedIn} handleClick={this.toggleModal} handleLogOut={this.userLogOut} />
        <Switch>
          <Route exact path='/' component={() => <Sidebar displayType='all' loggedIn={this.state.loggedIn} />} />
          
          <PrivateRoute 
            loggedIn={this.state.loggedIn} 
            component={() => <Sidebar displayType='user' loggedIn={this.state.loggedIn} />} 
            path='/my-headlines' exact 
          />

          <PrivateRoute 
            loggedIn={this.state.loggedIn} 
            component={() => <UserSources loggedIn={this.state.loggedIn}/>} 
            path='/user-sources' exact 
          />

         </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;