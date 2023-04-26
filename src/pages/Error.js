import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>sorry , the page you tried cannot be found</h3>

        <Link to='/'>
          <Button variant='contained'> back home</Button>
        </Link>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 3.5rem;
  }
  button {
    padding: 0.5rem 2rem;
  }
`
export default Error
