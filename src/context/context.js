import React, { useState, useEffect, useContext } from 'react'
import { mockUser } from './mockData.js/mockUser'
import { mockRepos } from './mockData.js/mockRepos'
import { mockFollowers } from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

const getLocalStorage = () => {
  let darkMode = localStorage.getItem('darkMode')

  if (darkMode) {
    return JSON.parse(localStorage.getItem('darkMode'))
  } else {
    return 'lightMode'
  }
}

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  // request loading
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  // error
  const [error, setError] = useState({ show: false, msg: '' })

  const [mainColor, setMainColor] = useState({
    main: '#2caeba',
    hover: '',
    darker: '',
  })

  const [isDarkMode, setIsDarkMode] = useState(getLocalStorage())

  const toggleDarkMode = () => {
    setIsDarkMode((prevValue) => !prevValue)
    document.documentElement.classList.toggle('dark-mode')
  }

  const randomMainColor = () => {
    const color = [
      '#2caeba',
      '#1984c5',
      '#22a7f0',
      '#63bff0',
      '#df979e',
      '#d7658b',
      '#776bcd',
      '#9080ff',
      '#e60049',
      '#0bb4ff',
      '#50e991',
      '#e6d800',
      '#9b19f5',
      '#ffa300',
      '#00bfa0',
    ].sort(() => 0.5 - Math.random())
    setMainColor({ ...mainColor, main: color[0] })
    console.log(color[0])
  }
  const searchGithubUser = async (user) => {
    toggleError()
    setIsLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results
          const status = 'fulfilled'
          if (repos.status === status) {
            setRepos(repos.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, 'there is no user with that username')
    }
    checkRequests()
    setIsLoading(false)
  }

  //  check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!')
        }
      })
      .catch((err) => console.log(err))
  }
  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }

  useEffect(checkRequests, [])

  useEffect(() => {
    searchGithubUser('john-smilga')
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
        isDarkMode,
        toggleDarkMode,
        mainColor,
        randomMainColor,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubProvider, useGlobalContext }
