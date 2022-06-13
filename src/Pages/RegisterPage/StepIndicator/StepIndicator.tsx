import styled, { css } from 'styled-components'
import { Step, StepStatus, StepType } from './Step'

export interface WizardHeaderProps {
  steps: StepType[]
  activeStep: StepType['id']
}

const getStatusByIndex = (activeStepIndex: number, stepIndex: number): StepStatus => {
  // get active step
  if (activeStepIndex < stepIndex) {
    return StepStatus.INACTIVE
  }

  if (activeStepIndex > stepIndex) {
    return StepStatus.COMPLETED
  }

  return StepStatus.ACTIVE
}

export const StepIndicator: React.FC<WizardHeaderProps> = ({ steps, activeStep }) => {
  type StepTypeOrDivider = StepType | 'divider'

  const stepsAndDividers = steps.reduce((result: StepTypeOrDivider[], step: StepType, index: number) => {
    result.push(step)

    const shouldAddDivider = !!(index < steps?.length - 1)
    shouldAddDivider && result.push('divider')

    return result
  }, [])

  const getStepIndexById = (id: StepType['id']) => steps?.findIndex(step => step.id === id)
  const activeStepIndex = getStepIndexById(activeStep)

  return (
    <Container>
      {stepsAndDividers.map((step, index) =>
        step === 'divider' ? (
          <StepDivider key={`${index}-divider`} isActive={index < activeStepIndex * 2} />
        ) : (
          <Step
            key={index}
            status={getStatusByIndex(activeStepIndex, getStepIndexById(step.id))}
            title={step.title}
            stepNumber={step.id + 1}
            id={step.id}
          />
        )
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 28px;
`

const StepDivider = styled.span<{ isActive?: boolean }>`
  &:last-child { 
    display: none;
  }
  flex: 1;
  border: 2px solid ${props => props.theme.colors.brownLight};
  transition: border-color 0.2s, box-shadow 0.2s;

    ${props =>
      props.isActive &&
      css`
        border: 2px solid ${props => props.theme.colors.brownLight};
        box-shadow: 0 0 2px ${props => props.theme.colors.red};
      `}
  }
`
