import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'

import { useGlobalContext } from '../context/context'

import { CircularProgress } from '@mui/material'
const Dashboard = () => {
  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <div className='loading'>
          <CircularProgress size={`6rem`} thickness={2} />
        </div>
      </main>
    )
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
