import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Navbar from './components/Navbar'

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


class App extends React.Component {
  state = {
    userId: undefined,
    showModal: true,
    modalLogin: false
  }

  toggleLogin = () => this.setState({showModal: !this.state.showModal});

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          {/* <Route exact path="/" component={() => <Home />} /> */}
          
        
        <Modal
          isOpen={this.state.showModal && this.state.userId === undefined}
          onRequestClose={this.toggleLogin}
          style={customStyles}
          contentLabel="Login or Sign up"
          shouldCloseOnOverlayClick={true}
        >
          <p>Sign up for an account to save your preferences</p>
            <Route exact path="/" component={() => <SignUpForm />} />
            <Route exact path="/signup" component={() => <SignUpForm />} />
            <Route exact path="/login" component={() => <LoginForm />} />
        </Modal>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
