import React from 'react'
import styled from 'styled-components'
import UserInfo from './UserInfo.js'

const Navbar = () => {
  return (
    <div>
      <Wrapper className='section-center'>
        <h4>search github user</h4>
        <UserInfo />
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 3rem;
  background: var(--clr-white);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-weight: 400;
    padding-top: 1rem;
  }
`

export default Navbar
