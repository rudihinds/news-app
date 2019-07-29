import React from 'react'
import HeadlineCard from '../components/HeadlineCard'
import Sidebar from '../components/Sidebar'
// import App from '../App'

class HeadlinesContainer extends React.Component{

  render(){
      
  return (
    <div>

        <Sidebar latestHeadlines={this.props.latestHeadlines} getCuratedHeadlines={this.props.getCuratedHeadlines}/>
      {/* The headlines container component{this.getArticleCardData()} */}
    </div>
  )
  }
}

export default HeadlinesContainer;