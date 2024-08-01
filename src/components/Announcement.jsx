import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  height: 35px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  overflow: hidden; /* Ensures the marquee text doesn't overflow */
`

const moveRightToLeft = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`

const MarqueeText = styled.div`
  animation: ${moveRightToLeft} 5s linear infinite; /* Adjust animation duration as needed */
`

const Announcement = () => {
  return (
    <Container>
      <MarqueeText>Super Deal! Gain maximum from it!!!</MarqueeText>
    </Container>
  )
}

export default Announcement
