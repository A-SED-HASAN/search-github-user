import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { useGlobalContext } from '../context/context'
import {
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'

const Search = () => {
  const [user, setUser] = React.useState('')
  const { requests, error, searchGithubUser, isLoading, isDarkMode } =
    useGlobalContext()

  // get things from global context
  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      // more logic coming up soon
      searchGithubUser(user)
      //optional
      // setUser('');
    }
  }
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
        <form
          className={`${
            isDarkMode ? 'form-control dark-mode' : 'form-control'
          }`}
          onSubmit={handleSubmit}>
          <FormControl variant='outlined'>
            <InputLabel>search</InputLabel>
            <OutlinedInput
              value={user}
              onChange={(e) => setUser(e.target.value)}
              endAdornment={
                requests > 0 &&
                !isLoading && (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleSubmit} edge='end'>
                      <SearchIcon color='primary' />
                    </IconButton>
                  </InputAdornment>
                )
              }
              label='search'
            />
          </FormControl>
        </form>
        <h3>requests : {requests} / 60</h3>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .dark-mode {
    background: #fefefe;
  }
  .form-control {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;

    input {
      padding: 0.73rem 0.5rem;
    }
    input.dark {
      background: white;
      color: white;
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`
export default Search
