<<<<<<< HEAD
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
      <HeadlineContainer />
      <BrowserRouter>
        <Route exact path="/" component={() => <Login />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/signup" component={() => <SignUpForm />} />
      </BrowserRouter>

    </div>
  )
=======
import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'


class App extends React.Component {
  state = {
    userId: undefined
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={() => <Login />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/signup" component={() => <SignUpForm />} />
          {/* <SignIn />
          <SignUp /> */}
        </BrowserRouter>
      </div>
    );
>>>>>>> 61225b4e628fc2362ee06fce29f03db5c6bc08f5
  }
}

export default App;