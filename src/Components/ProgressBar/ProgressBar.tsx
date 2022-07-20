import React from 'react'
import styled from 'styled-components'

import { maxSumForFreeShipping } from '../../helpers/variables'

export interface ProgressBarProps {
  totalSum: number | undefined
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ totalSum }) => {
  const percentage = totalSum && (totalSum * 100) / maxSumForFreeShipping
  const completedPercentage = percentage && percentage > 100

  return (
    <Container>
      <FillerContainer completed={completedPercentage ? 100 : percentage} />
    </Container>
  )
}

const Container = styled.div`
  height: 4px;
  max-width: 100%;
  background-color: ${props => props.theme.colors.greyLight};
  border-radius: 50px;
`

const FillerContainer = styled.div<{ completed: number | undefined }>`
  height: 100%;
  width: ${props => props.completed}%;

  background-color: ${props => props.theme.colors.brownLight};
  border-radius: inherit;
`
