import React from 'react'
import HeadlinesContainer from './containers/HeadlinesContainer'
import Navbar from './components/Navbar'
import API from './adapters/API'
import MediaCard from './components/MediaCard'
// import GridExample from './components/GridExample'
// import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'

class App extends React.Component{

  state = {
    latestHeadlines: [],
    topTwentyHeadlines: [],
    userCuratedArticles: [],
    showingAll: true
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

  render(){
    // const headlinesToRender, depending on the state of boolean showingAll, renders all or curated content
    let headlinesToRender;
    let twentyHeadlines = this.getTwentyHeadlines()
    let userCuratedArticles = this.state.userCuratedArticles
    this.state.showingAll ? headlinesToRender = twentyHeadlines : headlinesToRender = userCuratedArticles
    // const userCuratedHeadlines = this.getCuratedHeadlines()
    
  return (
    
    <div>
      <HeadlinesContainer latestHeadlines={headlinesToRender} getCuratedHeadlines={this.getCuratedHeadlines}/>
      {/* <MediaCard /> */}

    </div>
  )
  }
}

export default App;