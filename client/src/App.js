import React from 'react'
import HeadlineContainer from './containers/HeadlinesContainer'
import Navbar from './components/Navbar'
import API from './adapters/API'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'

class App extends React.Component{

  state = {
    latestHeadlines: []
  }

  componentDidMount(){
    API.getArticles().then(console.log)
  }

  render(){
  return (
    <div>
      <Navbar />
      <h1>The App component</h1>
      <BrowserRouter>
        <Route exact path="/" component={() => <HeadlineContainer />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/signup" component={() => <SignUpForm />} />
      </BrowserRouter>

    </div>
  )
  }
}

export default App;