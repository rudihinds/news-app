import React from 'react'
import HeadlineCard from '../components/HeadlineCard'
import API from '../adapters/API'

class HeadlinesContainer extends React.Component {
  state = {
    headlines: [],
    savedArticles: [],
    page: 1,
    hasNextPage: false,
    isNextPageLoading: false
  }

  componentDidMount = () => {
    this.getArticles();
    window.addEventListener('scroll', this.handleScroll)
    
    if (this.props.loggedIn) API.getUserSavedArticles()
        .then(savedArticles => this.setState(savedArticles))
  }

  componnentWillUnmount = () => window.removeEventListener('scroll', this.handleScroll)

  handleScroll = () => {
    const {hasNextPage, isNextPageLoading} = this.props

    if (isNextPageLoading || !hasNextPage) return;
  
    if (
      window.innerHeight + document.documentElement.scrollTop + 2500
      >= document.documentElement.offsetHeight
    ) {
      this.loadNextPage();
    }
  }

  getArticles = () => {
    ((this.props.displayType === 'all' || !this.props.loggedIn) ? API.getArticles() : API.getUserArticles())
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

  toggleSavedArticle = id => {
    if (this.state.savedArticles.includes(id)) {
      this.setState({savedArticles: this.state.savedArticles.filter(savedId => savedId !== id)})
    } else {
      this.setState({savedArticles: [...this.state.savedArticles, id]})
    }
  };

  render() {
    const {toggleSavedArticle} = this.props
    const {headlines, savedArticles, hasNextPage, isNextPageLoading} = this.state

    return (
      <main >
        <div  style={{ marginTop: '10vh' }} />
            {headlines.length === 0 ? 
              <h1 style={{marginTop: '15vh', marginLeft: '3vh'}}>No headlines to display</h1> 
            : 
              headlines.map(headline => (
                <React.Fragment key={headline.id}>
                  <br />
                  <div style={{ display: 'flex', width: '50vw' }}>
                  <HeadlineCard key={headline.id} {...headline} savedArticles={savedArticles} toggleSavedArticle={toggleSavedArticle} loggedIn={this.props.loggedIn} />
                  </div>
                </React.Fragment>
              ))
            }
            <br />
            {isNextPageLoading &&
              <div>Loading...</div>
            }
            {(!hasNextPage &&  document.documentElement.scrollTop > 1000) &&
              <div>You did it! You reached the end!</div>
            }
      </main>
    )
  }
}

export default HeadlinesContainer;