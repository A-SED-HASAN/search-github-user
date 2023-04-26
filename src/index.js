import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-k3jcu6blnnrdmv3l.us.auth0.com'
      clientId='SodURXgJo99MET2pf8ZEMA9wNMMRjsvJ'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'>
      <GithubProvider>
        <Router>
          <App />
        </Router>
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
)
