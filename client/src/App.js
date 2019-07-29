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
    userId: undefined,
    latestHeadlines: [],
    topTwentyHeadlines: [],
    userCuratedArticles: [],
    showingAll: true,
    userSources: [],
    showModal: true,
    modalLogin: false
  }

  componentDidMount(){
    API.validateUser().then(user => {
      if (!user.error) this.setState({userId: user.id, showModal: false})
    })

    API.getArticles()
      .then(latestHeadlines => this.setState({ latestHeadlines }))
    API.getUserSources()
      .then(userSources => this.setState({ userSources }))
      // .then(userSources => console.log(userSources))

  }
    

  getTwentyHeadlines = () => this.state.latestHeadlines.slice(0,20)

  getCuratedHeadlines = () => {
    API.getUserArticles()
      .then(userCuratedArticles => {
        this.setState({ 
          userCuratedArticles, 
          showingAll: false })
      })
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});
  toggleLogin = () => this.setState({modalLogin: !this.state.modalLogin});

  setUser = (userId) => this.setState({ userId })

  render(){
    
    let headlinesToRender;
    let userSources = this.state.userSources
    let twentyHeadlines = this.getTwentyHeadlines()
    let userCuratedArticles = this.state.userCuratedArticles
    this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles
    
  return (
    
    <div>
      <CssBaseline />
      <BrowserRouter>
      <div id='modal-to-top' >
        <Dialog
            open={this.state.showModal && this.state.userId === undefined}
            onClose={this.toggleModal}
          >
            {this.state.modalLogin ? 
              <SignUpForm handleClick={this.toggleLogin} toggleModal={this.toggleModal} setUser={this.setUser}/> 
            : 
              <LoginForm handleClick={this.toggleLogin} toggleModal={this.toggleModal} setUser={this.setUser}/>
            }
        </Dialog>
      </div>
      <Navbar showLogin={!this.state.userId} handleClick={this.toggleModal} />
      
        <Route exact path='/' component={() => <Sidebar latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>} />
        <Route exact path='/user-sources' component={() => <UserSources userSources={userSources}/>} />
      </BrowserRouter>
    </div>
  )
  }
}

export default App;