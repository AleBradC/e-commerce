import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { PreferencesOptions, RegistrationStep, SocialMediaOptions } from './types'
import { StepType } from './StepIndicator/Step'
import { Modal } from '../../components/Modal/Modal'
import { StepIndicator } from './StepIndicator/StepIndicator'
import { Button } from '../../components/Button/Button'

import { FirstStep } from './Steps/FirstStep'
import { SecondStep } from './Steps/SecondStep/SecondStep'
import { ThirdStep } from './Steps/ThirdStep'

export interface RegistrationFirstStepFormField {
  userName: string
  eMail: string
  password: string
  confirmPassword: string
  socialMediaOption: SocialMediaOptions[]
  preferencesOption: PreferencesOptions[]
}

export interface RegisterPageProps {
  showRegistration: boolean
  closeRegistration: () => void
}

const steps: StepType[] = [
  {
    id: 0,
    title: 'Information',
  },
  {
    id: 1,
    title: 'Preferences',
  },
  {
    id: 2,
    title: 'Completed',
  },
]

const RegisterPage: React.FC<RegisterPageProps> = ({ showRegistration, closeRegistration }) => {
  const [activeStep, setActiveStep] = useState(RegistrationStep.FIRST_STEP ? 0 : 1)

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid },
  } = useForm<RegistrationFirstStepFormField>({
    mode: 'onChange',
    defaultValues: {
      userName: '',
      eMail: '',
      password: '',
      confirmPassword: '',
      socialMediaOption: [],
      preferencesOption: [],
    },
  })

  if (!showRegistration) {
    return null
  }

  const onRegister = (data: RegistrationFirstStepFormField) => {
    console.log(data)
    // to do spinner

    closeRegistration()
    reset()
    setActiveStep(0)
  }

  const handleNextClick = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBackClick = () => {
    setActiveStep(activeStep - 1)
  }

  const handleCloseRegistrationModal = () => {
    closeRegistration && closeRegistration()
    reset()
  }

  return (
    <Modal
      header={
        <HeaderContainer>
          <StepIndicator steps={steps} activeStep={activeStep} />
        </HeaderContainer>
      }
      body={
        <RegistrationForm>
          {activeStep === 0 && <FirstStep formControl={control} />}
          {activeStep === 1 && <SecondStep formControl={control} />}
          {activeStep === 2 && <ThirdStep />}
        </RegistrationForm>
      }
      footer={
        <Footer>
          {activeStep > 0 && <Button onClick={handleBackClick}> BACK </Button>}
          {activeStep < 2 ? (
            <Button onClick={handleNextClick} disabled={!isDirty || !isValid}>
              NEXT
            </Button>
          ) : (
            <Button onClick={handleSubmit(onRegister)} disabled={!isDirty || !isValid}>
              SUBMIT
            </Button>
          )}
        </Footer>
      }
      showModal={showRegistration}
      onClose={handleCloseRegistrationModal}
    />
  )
}

const HeaderContainer = styled.div`
  width: 100%;
`

const RegistrationForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`

export default RegisterPage
