import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export interface StepType {
  id: number
  title: string
}

export enum StepStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

type StepIndicatorProps = Pick<StepType, 'id' | 'title'> & {
  status: StepStatus
  stepNumber: StepType['id']
  title: StepType['title']
}

export const Step: React.FC<StepIndicatorProps> = ({ stepNumber, status, title }) => {
  const isCompleted = status === StepStatus.COMPLETED
  const isActive = status === StepStatus.ACTIVE

  return (
    <Container>
      <StepBullet isCompleted={isCompleted} isActive={isActive}>
        {isCompleted ? <FontAwesomeIcon icon={faCheck} /> : <StepNumber isActive={isActive}>{stepNumber}</StepNumber>}
      </StepBullet>
      <Title isCompleted={isCompleted} isActive={isActive}>
        {title}
      </Title>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StepBullet = styled.div<{ isCompleted?: boolean; isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  transition: 0.2s;
  font-size: 16px;
  line-height: 25px;
  border: 2px solid ${props => props.theme.colors.beige};

  ${props =>
    props.isActive &&
    css`
      border: 2px solid ${props => props.theme.colors.brownLight};
      box-shadow: 0 0 2px ${props => props.theme.colors.red};
    `}

  ${props =>
    props.isCompleted &&
    css`
      background-color: ${props => props.theme.colors.brown};
      border: 2px solid ${props => props.theme.colors.brown};
    `}
`

const StepNumber = styled.span<{ isActive: boolean }>`
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.beige};

  ${props =>
    props.isActive &&
    css`
      color: ${props => props.theme.colors.brownLight};
    `}
`

const Title = styled.span<{ isActive: boolean; isCompleted: boolean }>`
  position: absolute;
  display: flex;
  left: auto;
  right: auto;
  bottom: -14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.colors.beige};

  ${props =>
    props.isActive &&
    css`
      color: ${props => props.theme.colors.brownLight};
    `}

  ${props =>
    props.isCompleted &&
    css`
      color: ${props => props.theme.colors.brown};
    `}
`
