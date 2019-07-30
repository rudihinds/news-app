import React from 'react'
import API from './adapters/API'
import { BrowserRouter, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Sidebar from './components/Sidebar';
import UserSources from './components/UserSources';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar'

class App extends React.Component{

  state = {
    loggedIn: false,
    allSources: [],
    userSources: [],
    showModal: true,
    modalLogin: false
  }
  
  componentDidMount(){
    API.validateUser().then(user => {
      if (!user.error && user.id) {
        this.setState({loggedIn: true, showModal: false})

        API.getUserSources()
          .then(userSources => this.setState({ userSources: userSources.map( source => source.id ) }))
      }
    })
    
    API.getSources()
      .then(allSources => allSources.sources ? this.setState({ allSources: allSources.sources }) : null)
    
  }

  allSourcesToRender = () => this.state.allSources.filter(source => !this.state.userSources.includes(source.id))

  userSourcesToRender = () => this.state.allSources.filter(source => this.state.userSources.includes(source.id))

  addSourceIdToUserSources = sourceId => {
    this.setState({userSources: [...this.state.userSources, sourceId]})
    API.addUserSource(sourceId)
  }

  deleteUserSource = (userSourceId) => {
    this.setState({
      userSources: this.state.userSources.filter(id => id !== userSourceId)
    })
    API.deleteUserSource(userSourceId)
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});
  toggleLogin = () => this.setState({modalLogin: !this.state.modalLogin});

  userLogOut = () => {
    API.clearToken();
    this.setState({ loggedIn: false})
  }

  userLogIn = () => this.setState({ loggedIn: true})

  render(){
    let allSources = this.allSourcesToRender()
    let userSources = this.userSourcesToRender()
    let userCuratedArticles = this.state.userCuratedArticles
    // this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles

    
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
      
        <Route exact path='/' component={() => <Sidebar displayType='all' loggedIn={this.state.loggedIn} />} />

        <Route exact path='/my-headlines' component={() => <Sidebar displayType='user' loggedIn={this.state.loggedIn} />} />

        <Route exact path='/user-sources' component={() => <UserSources userSources={userSources} allSources={allSources} />} />

      </BrowserRouter>
    </div>
  )
  }
}

export default App;