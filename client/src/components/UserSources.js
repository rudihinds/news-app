import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import API from '../adapters/API'

export default class UserSources extends React.Component {
  state = {
    allSources: [],
    userSources: []
  }

  componentDidMount() {
    API.getSources()
    .then(allSources => allSources.sources ? this.setState({ allSources: allSources.sources }) : null)

    API.getUserSources()
      .then(userSources => this.setState({ userSources: userSources.map( source => source.id ) }))
  }

  allSourcesToRender = () => this.state.allSources.filter(source => !this.state.userSources.includes(source.id))

  userSourcesToRender = () => this.state.allSources.filter(source => this.state.userSources.includes(source.id))

  addSourceIdToUserSources = sourceId => {
    API.addUserSource(sourceId)
    .then(this.setState({userSources: [...this.state.userSources, sourceId]}))
  }

  deleteUserSource = (userSourceId) => {
    API.deleteUserSource(userSourceId)
      .then(this.setState({userSources: this.state.userSources.filter(id => id !== userSourceId)}))
  }

  defaultImage = e => {
    e.target.src = require('../default_avatar.png')
  }

  logAllSources = () => this.allSourcesToRender().map(source => {
    return (
        <Chip key={source.id}
          avatar={<Avatar alt="Natacha" imgProps={{onError: this.defaultImage}} src={`https://icon-locator.herokuapp.com/icon?url=${source.url}&size=70..120..200&fallback_icon_color=ff0000`} />}
          style={{margin: '1vh'}} 
          label={source.name} 
          onClick={() => this.addSourceIdToUserSources(source.id)} 
          size="medium"
          variant="outlined"
        />
    )})

  logSources = () => this.userSourcesToRender().map(source => {
    return (
        <Chip key={source.id}
          avatar={<Avatar alt={`${source.name} logo`}imgProps={{onError: this.defaultImage}} src={`https://icon-locator.herokuapp.com/icon?url=${source.url}&size=70..120..200`} />}
          style={{margin: '1vh'}} 
          label={source.name} 
          onDelete={() => this.deleteUserSource(source.id)} 
          color="primary" 
          variant="default"
        />
    )})

  render() {
    console.log(this.state.userSources)
    return (
      <div style={{margin: '1vw'}} >
      <div>
          <br></br> 
          <br></br>
          <br></br>
          <br></br>
      <h1>Click on the tabs to customise your news feed</h1>
      {this.logSources()} 
      </div>
      <div>
      <h1>All Sources</h1>
      {this.logAllSources()}
      </div>
      </div>

    )
  }
}
