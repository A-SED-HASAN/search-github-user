import React from 'react'
import { useGlobalContext } from '../context/context'
import styled from 'styled-components'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'

import { Button } from '@mui/material'
const Card = () => {
  const { githubUser } = useGlobalContext()
  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username,
  } = githubUser

  return (
    <Wrapper>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{name}</h4>
          <p>@{twitter_username || 'john doe'}</p>
        </div>
        <Button variant='outlined' href={html_url}>
          follow
        </Button>
      </header>
      <p className='bio'>{bio}</p>
      <div className='links'>
        <p>
          <LocationCityOutlinedIcon />
          {company}
        </p>
        <p>
          <FmdGoodOutlinedIcon />
          {location || 'earth'}
        </p>
        <Button href={`https://${blog}`}>
          <InsertLinkOutlinedIcon />
          {blog}
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: 'user';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;

      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      padding: 0;
      text-transform: lowercase;
      transition: var(--transition);
    }
  }
`
export default Card
