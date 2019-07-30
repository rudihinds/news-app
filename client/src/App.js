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
    headlines: [],
    savedArticles: [],
    topTwentyHeadlines: [],
    userCuratedArticles: [],
    showingAll: true,
    userSources: [],
    showModal: true,
    modalLogin: false,
    page: 1,
    hasNextPage: false,
    isNextPageLoading: false
  }

  componentDidMount(){
    API.validateUser().then(user => {
      if (!user.error && user.id) {
        this.setState({userId: user.id, showModal: false})

      API.getUserSources()
        .then(userSources => this.setState({ userSources }))
  
      API.getUserSavedArticles()
        .then(savedArticles => this.setState(savedArticles))
      }
    })

    this.getArticles();

  }

  getArticles = () => {
    API.getArticles()
    .then(data => this.setState({ 
      headlines: this.state.page === 1 ? data.articles : [...this.state.headlines, ...data.articles],
      hasNextPage: data.hasNextPage,
      isNextPageLoading: false,
      page: this.state.page + 1
    }))
  }

  loadNextPage = () => {
    this.setState({ isNextPageLoading: true }, () => {
      this.getArticles();
    });
  };
    

  getTwentyHeadlines = () => this.state.headlines.slice(0,20)

  getCuratedHeadlines = () => {
    API.getUserArticles()
      .then(data => {
        this.setState({ 
        userCuratedArticles: data.articles,
        totalHeadlines: data.totalResults,
        hasNextPage: data.hasNextPage,
        showingAll: false })
    })
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});
  toggleLogin = () => this.setState({modalLogin: !this.state.modalLogin});

  setUser = (userId) => this.setState({ userId });

  toggleSavedArticle = id => {
    if (this.state.savedArticles.includes(id)) {
      this.setState({savedArticles: this.state.savedArticles.filter(savedId => savedId !== id)})
    } else {
      this.setState({savedArticles: [...this.state.savedArticles, id]})
    }
  };

  render(){
    
    let userSources = this.state.userSources
    let twentyHeadlines = this.getTwentyHeadlines()
    let userCuratedArticles = this.state.userCuratedArticles
    // this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles

    
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
      
        <Route exact path='/' component={() => 
          <Sidebar 
            toggleSavedArticle={this.toggleSavedArticle} 
            headlines={this.state.headlines} 
            savedArticles={this.state.savedArticles} 
            getCuratedHeadlines={this.getCuratedHeadlines} 
            totalHeadlines={this.state.totalHeadlines} 
            hasNextPage={this.state.hasNextPage} 
            isNextPageLoading={this.state.isNextPageLoading} 
            loadNextPage={this.loadNextPage} />} 
          />

        <Route exact path='/user-sources' component={() => <UserSources userSources={userSources}/>} />

      </BrowserRouter>
    </div>
  )
  }
}

export default App;