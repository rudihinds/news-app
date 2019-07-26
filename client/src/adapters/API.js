const apiEndpoint = 'http://localhost:3000'
const articlesURL = `${apiEndpoint}/articles`
const sourcesURL = `${apiEndpoint}/sources`
const usersURL = `${apiEndpoint}/users`

const jsonify = res => {
  if (res.ok)
      return res.json()
  else
      throw new Error(res.json())
}
const handleServerError = response => console.error(response)

const constructHeaders = (moreHeaders = {}) => (
  {
      'Authorization': localStorage.getItem('token'),
      ...moreHeaders
  }
)

const getArticles = () => {
  return fetch(articlesURL, { headers: constructHeaders() })
    .then(resp => resp.json)
}

const getSources = () => {
  return fetch(sourcesURL, { headers: constructHeaders() })
    .then(resp => resp.json)
}

const getUsers = () => {
  return fetch(usersURL, { headers: constructHeaders() })
    .then(resp => resp.json)
}

const signUp = (user) => fetch(signupUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
      localStorage.setItem('token', data.token)
      return data.user
  })
  .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)

const validateUser = () => {
  if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

  return fetch(validateUrl, {
      headers: constructHeaders()
  }).then(jsonify)
      .then(data => {
          localStorage.setItem('token', data.token)
          return data.user
      })
      .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')

export default {
  signUp,
  logIn,
  validateUser,
  clearToken,
  getUsers,
  getArticles,
  getSources
}