import React from 'react'
import HeadlineContainer from './containers/HeadlinesContainer'
import Navbar from './components/Navbar'
import API from './adapters/API'

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

    </div>
  )
  }
}

export default App;