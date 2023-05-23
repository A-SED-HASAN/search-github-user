import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Followers from './Followers'
const User = () => {
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Card />
        <Followers />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  grid-template-columns: 1fr 1fr;
  @media (width<=850px) {
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  }
`

export default User
