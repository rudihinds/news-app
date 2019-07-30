import React from 'react'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends React.PureComponent {
  componentWillUpdate = () => {

  }

  render() {
    const {component: Component, loggedIn, ...rest} = this.props

    return (
      <Route
        {...rest}
        render={(props) => loggedIn
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )
  }
}

export default PrivateRoute;