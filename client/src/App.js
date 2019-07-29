import React from 'react'
import HeadlinesContainer from './containers/HeadlinesContainer'
import API from './adapters/API'
import { BrowserRouter, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

class App extends React.Component{

  state = {
    user: undefined,
    latestHeadlines: [],
    topTwentyHeadlines: [],
    userCuratedArticles: [],
    showingAll: true,
    showModal: true,
    modalLogin: false
  }

  componentDidMount(){
    
    API.getArticles().then(latestHeadlines => this.setState({

      latestHeadlines

      // topTwentyHeadlines: this.state.latestHeadlines.slice(0,20)
      

    })) 
    
      // .then(this.getTwentyHeadlines())
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

  setUser = (userId) => this.setState({ user: userId })

  render(){
    // const headlinesToRender, depending on the state of boolean showingAll, renders all or curated content
    let headlinesToRender;
    let twentyHeadlines = this.getTwentyHeadlines()
    let userCuratedArticles = this.state.userCuratedArticles
    this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles
    // const userCuratedHeadlines = this.getCuratedHeadlines()
    
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
        <Route exact path="/" component={() => <HeadlinesContainer latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>} />
        <Route exact path="/login" component={() => <LoginForm />} />
        <Route exact path="/signup" component={() => <SignUpForm />} />
      </BrowserRouter>
    </div>
  )
  }
}

export default App;