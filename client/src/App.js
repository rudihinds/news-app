import React from 'react'
import HeadlinesContainer from './containers/HeadlinesContainer'
import API from './adapters/API'
import { BrowserRouter, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Sidebar from './components/Sidebar';
import UserSources from './components/UserSources';

class App extends React.Component{

  state = {
    userId: undefined,
    latestHeadlines: [],
    topTwentyHeadlines: [],
    userCuratedArticles: [],
    showingAll: true,
    allSources: [],
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
    API.getSources()
      .then(allSources => this.setState({ allSources }))
    API.getUserSources()
      .then(userSources => this.setState({ userSources: userSources.map( source => source.id ) }))
    
  }
  
  // addSourceToUserSources = sourceId => {
  //   let userSources = this.state.userSources
  //   let allSources = this.state.allSources
  //   this.setState({
  //     userSources: allSources.filter(source => userSources.includes(source.id))
  //   })
  // }

  allSourcesToRender = () => this.state.allSources.filter(source => !this.state.userSources.includes(source.id))

  userSourcesToRender = () => this.state.allSources.filter(source => this.state.userSources.includes(source.id))

  addSourceIdToUserSources = sourceId => this.setState({userSources: [...this.state.userSources, sourceId]})

  getTwentyHeadlines = () => this.state.latestHeadlines.slice(0,20)

  deleteUserSource = (sourceId) => {
    this.setState({
      userSources: this.state.userSources.filter(id => id !== sourceId)
    })
    // fetch('http://localhost:3000/api/v1/user_sources', {
    //   method: "DELETE",
    //   headers: {'Content-Type': 'application/json'},
    //   body: {sourceId}
    //   }).then(resp => resp.json())
    //     .then(console.log)
    }

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
    // console.log(API.userSourcesUrl)
    
    let headlinesToRender;
    let userSources = this.userSourcesToRender()
    let allSources = this.allSourcesToRender()
    let twentyHeadlines = this.getTwentyHeadlines()
    let userCuratedArticles = this.state.userCuratedArticles
    this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles
    
  return (
    
    <div>

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

      <BrowserRouter>
        <Route exact path='/user-sources' component={() => <UserSources userSources={userSources} allSources={allSources} addSourceIdToUserSources={this.addSourceIdToUserSources} deleteUserSource={this.deleteUserSource}/>} />
        <Route exact path='/' component={() => <Sidebar latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>} />
        <Route exact path="/login" component={() => <LoginForm />} />
        <Route exact path="/signup" component={() => <SignUpForm />} />
      </BrowserRouter>
    </div>
  )
  }
}

export default App;