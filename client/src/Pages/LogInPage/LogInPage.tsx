import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { logInRoute } from '../../helpers/routes'
import useBreakpoint from '../../hooks/useBreakpointsHook/useBreakpoint'
import RegisterPage from '../RegisterPage/RegisterPage'
import { CustomInput, InputSize } from '../../components/CustomInput/CustomInput'
import { Button } from '../../components/Button/Button'

export interface LogInFormFields {
  email: string
  password: string
}

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isDirty, isValid },
  } = useForm<LogInFormFields>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigateTo = useNavigate()
  const breakPoint = useBreakpoint()
  const isTabletOrUp = breakPoint === 'md' || breakPoint === 'lg' || breakPoint === 'xl'

  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  const handleLogIn = (data: LogInFormFields) => {
    console.log(data)
    // to do spinner

    reset()
  }

  const handleOpenRegistration = () => {
    setShowRegistrationModal(true)

    navigateTo({
      pathname: logInRoute,
      search: '?q=register',
    })
  }

  const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false)

    navigateTo({
      pathname: logInRoute,
      search: '',
    })
  }

  return (
    <Container>
      <LoginContainer noValidate autoComplete="off" onSubmit={handleSubmit(handleLogIn)} isMobile={!isTabletOrUp}>
        <Title> LOG IN </Title>
        <StyledCustomInput
          placeholder="Email"
          type="email"
          id="email"
          sizeVariant={InputSize.SMALL}
          error={touchedFields.email ? errors?.email?.message : undefined}
          required
          {...register('email', {
            required: { value: true, message: 'This field is required' },
          })}
        />

        <StyledCustomInput
          placeholder="Password"
          type="password"
          id="password"
          error={errors.password?.message}
          sizeVariant={InputSize.SMALL}
          required
          {...register('password', {
            required: { value: true, message: 'This field is required' },
          })}
        />
        <Button type="submit" disabled={!isDirty || !isValid}>
          LOG IN
        </Button>
        <ForgotPassContent> FORGOT YOUR PASSWORD? </ForgotPassContent>
      </LoginContainer>

      {isTabletOrUp ? (
        <RegisterContainer>
          <Title> REGISTER </Title>
          <Content>IF YOU STILL DONT HAVE A ZARA.COM ACCOUNT, USE THIS OPTION TO ACCESS THE REGISTRATION FORM.</Content>
          <Content>
            BY GIVING US YOUR DETAILS, PURCHASING IN ZARA.COM WILL BE FASTER AND AN ENJOYABLE EXPERIENCE.
          </Content>
          <Button onClick={handleOpenRegistration}> REGISTER </Button>
        </RegisterContainer>
      ) : (
        <RegisterMobileContent>
          DON’T HAVE AN ACCOUNT?
          <RegisterButton onClick={handleOpenRegistration}> REGISTER </RegisterButton>
        </RegisterMobileContent>
      )}

      <RegisterPage showRegistration={showRegistrationModal} closeRegistration={handleCloseRegistrationModal} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-grow: 1;

  padding: 126px 0 126px 28px;
`

const LoginContainer = styled.form<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  max-width: ${props => (props.isMobile ? '16rem' : '28rem')};
  width: 100%;
`

const Title = styled.span`
  margin-bottom: 6px;

  font-size: 20px;
  font-family: 'Optima', sans-serif;
  font-weight: 600;
  color: ${props => props.theme.colors.black};
`

const StyledCustomInput = styled(CustomInput)`
  margin-bottom: 2px;
  width: 400px;
`

const ForgotPassContent = styled.span`
  margin-top: 10px;
  margin-bottom: 24px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 30px;

  max-width: 30rem;
  width: 100%;
`

const Content = styled.span`
  margin-bottom: 24px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`

const RegisterMobileContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 18px;
  margin-left: -8px;
  width: 100%;

  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
`

const RegisterButton = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  font-family: 'Montserrat', sans-serif;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

export default LogInPage
