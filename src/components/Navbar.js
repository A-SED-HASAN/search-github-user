import React from 'react'
import styled from 'styled-components'
import UserInfo from './UserInfo.js'

const Navbar = () => {
  return (
    <div>
      <Wrapper className='section-center'>
        <h3>search github user</h3>
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
  align-items: end;

  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
`

export default Navbar
