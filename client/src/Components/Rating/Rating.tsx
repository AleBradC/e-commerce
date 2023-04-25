import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FaStar } from 'react-icons/fa'

export interface RatingProps {
  existingRating?: any
}

export const Rating: React.FC<RatingProps> = ({ existingRating }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    setRating(existingRating)
  }, [existingRating])

  return (
    <Container>
      {[...Array(5)].map((_, index) => {
        index += 1
        return (
          <StarButton
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            onClick={() => setRating(index)}
          >
            <FaStar color={index <= (hover || rating) ? 'orange' : 'lightgray'} />
          </StarButton>
        )
      })}
    </Container>
  )
}

const Container = styled.div``
const StarButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`
