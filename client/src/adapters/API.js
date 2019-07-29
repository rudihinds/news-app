const apiEndpoint = 'http://localhost:3000/api/v1'
const articlesUrl = `${apiEndpoint}/articles`
const sourcesUrl = `${apiEndpoint}/sources`
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`

const jsonify = res => {
  return res.json()
  if (res.ok)
    return res.json()
  else
      throw new Error(res.json())     
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
  {
      'Authorization': localStorage.getItem('token'),
      ...moreHeaders
  }
)

const getArticles = () => {
  return fetch(articlesUrl, { headers: constructHeaders() })
    .then(resp => resp.json)
}

const getSources = () => {
  return fetch(sourcesUrl, { headers: constructHeaders() })
    .then(resp => resp.json)
}

const getUsers = () => {
  return fetch(usersUrl, { headers: constructHeaders() })
    .then(resp => resp.json)
}

const signUp = (user) => fetch(usersUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data.errors}
    } else {
      localStorage.setItem('token', data.token)
      return {user: data.user}
    }
  })
  .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      console.log('errors: ',data.errors)
    } else {
      localStorage.setItem('token', data.token)
      return {user: data.user}
    }
  })
  .catch(handleServerError)

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