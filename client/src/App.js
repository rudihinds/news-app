import React from 'react'
import HeadlinesContainer from './containers/HeadlinesContainer'
import API from './adapters/API'
import MediaCard from './components/MediaCard'
// import GridExample from './components/GridExample'
// import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'
import Sidebar from './components/Sidebar';
import UserSources from './components/UserSources';

class App extends React.Component{

  state = {
    latestHeadlines: [],
    topTwentyHeadlines: [],
    userCuratedArticles: [],
    showingAll: true,
    userSources: []
  }

  componentDidMount(){
    
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

  render(){
    
    let headlinesToRender;
    let userSources = this.state.userSources
    let twentyHeadlines = this.getTwentyHeadlines()
    let userCuratedArticles = this.state.userCuratedArticles
    this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles
    
  return (
    
    <div>
     <BrowserRouter>
       <Route exact path='/' component={() => <Sidebar latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>} />
       <Route exact path='/user-sources' component={() => <UserSources userSources={userSources}/>} />
       {/* <Route exact path='/login' component={() => <LoginForm />} />
       <Route exact path='/signup' component={() => <SignUpForm />} /> */}
     </BrowserRouter>
    </div>
  )
  }
}


/* <div>
     <Navbar />
     <h1>The App component</h1>
     <BrowserRouter>
       <Route exact path=“/” component={() => <HeadlinesContainer latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>} />
       <Route exact path=“/login” component={() => <LoginForm />} />
       <Route exact path=“/signup” component={() => <SignUpForm />} />
     </BrowserRouter>
</div> */

  // <div>
    //   <HeadlinesContainer latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>
    //   {/* <MediaCard /> */}

    // </div>

export default App;