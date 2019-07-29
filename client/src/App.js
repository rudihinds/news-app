import React from 'react'
import HeadlineContainer from './containers/HeadlinesContainer'
import Navbar from './components/Navbar'
import API from './adapters/API'
import { BrowserRouter, Route } from 'react-router-dom';
import Modal from 'react-modal';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class App extends React.Component{

  state = {
    user: undefined,
    latestHeadlines: [],
    showModal: true,
    modalLogin: false
  }

  componentDidMount(){
    API.getArticles().then(console.log)
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});
  toggleLogin = () => this.setState({modalLogin: !this.state.modalLogin});

  setUser = (userId) => this.setState({ user: userId })

  render(){
  return (
    <div>
      <Navbar />
      <h1>The App component</h1>
      <BrowserRouter>
        <Route exact path="/" component={() => <HeadlineContainer />} />
        <Route exact path="/login" component={() => <LoginForm />} />
        <Route exact path="/signup" component={() => <SignUpForm />} />

        <Modal
          isOpen={this.state.showModal && this.state.userId === undefined}
          onRequestClose={this.toggleModal}
          style={customStyles}
          contentLabel="Login or Sign up"
          shouldCloseOnOverlayClick={true}
        >
          {this.state.modalLogin ? 
            <SignUpForm handleClick={this.toggleLogin} toggleModal={this.toggleModal} setUser={this.setUser}/> 
          : 
            <LoginForm handleClick={this.toggleLogin} toggleModal={this.toggleModal} setUser={this.setUser}/>
          }
        </Modal>

      </BrowserRouter>
    </div>
  )
  }
}

export default App;