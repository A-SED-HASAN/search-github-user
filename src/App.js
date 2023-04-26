import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { Routes, Route } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import { useGlobalContext } from './context/context'
function App() {
  const { mainColor } = useGlobalContext()
  const theme = createTheme({
    palette: {
      primary: {
        main: `${mainColor.main}`,
        contrastText: 'rgba(255,255,255,1)',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <AuthWrapper>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </AuthWrapper>
    </ThemeProvider>
  )
}

export default App
