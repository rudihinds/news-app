const apiEndpoint = 'http://localhost:3000'
const articlesURL = 'http://localhost:3000/articles'
const sourcesURL = 'http://localhost:3000/sources'
const usersURL = 'http://localhost:3000/users'

const getArticles = () => {
  return fetch(articlesURL).then(resp => resp.json)
}

const getSources = () => {
  return fetch(sourcesURL).then(resp => resp.json)
}

const getUsers = () => {
  return fetch(usersURL).then(resp => resp.json)
}