import styled from 'styled-components'
import { Control, useController } from 'react-hook-form'

import { RegistrationFirstStepFormField } from '../RegisterPage'
import { CustomInput, InputSize } from '../../../components/CustomInput/CustomInput'

export interface FirstStepProps {
  formControl: Control<RegistrationFirstStepFormField>
}

const emailValidationRegex = /^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i
const specialCharacters = /[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/

export const FirstStep: React.FC<FirstStepProps> = ({ formControl }) => {
  const usernameController = useController({
    name: 'userName',
    control: formControl,
    rules: {
      required: { value: true, message: 'This field is required' },
    },
  })

  const eMailController = useController({
    name: 'eMail',
    control: formControl,
    rules: {
      required: { value: true, message: 'This field is required' },
      pattern: {
        value: emailValidationRegex,
        message: 'Invalid format',
      },
    },
  })

  const passwordController = useController({
    name: 'password',
    control: formControl,
    rules: {
      required: { value: true, message: 'This field is required' },
      minLength: { value: 3, message: 'Please add more than 3 characters' },
      maxLength: { value: 12, message: 'Please add less than 12 characters' },
      pattern: {
        value: specialCharacters,
        message: 'Please add a special character',
      },
    },
  })

  const confirmPasswordController = useController({
    name: 'confirmPassword',
    control: formControl,
    rules: {
      required: { value: true, message: 'This field is required' },
      minLength: { value: 3, message: 'Please add more than 3 characters' },
      maxLength: { value: 12, message: 'Please add less than 12 characters' },
      validate: value => value === passwordController.field.value || 'The password did not match',
      pattern: {
        value: specialCharacters,
        message: 'The password are not matching',
      },
    },
  })

  return (
    <Container>
      <ContentContainer>
        <CustomInput
          label="Username"
          name={usernameController.field.name}
          value={usernameController.field.value}
          ref={usernameController.field.ref}
          onChange={usernameController.field.onChange}
          onBlur={usernameController.field.onBlur}
          error={usernameController.fieldState.error?.message}
          sizeVariant={InputSize.LARGE}
          placeholder="Add first name"
        />
      </ContentContainer>

      <ContentContainer>
        <CustomInput
          label="E-mail address"
          name={eMailController.field.name}
          value={eMailController.field.value}
          ref={eMailController.field.ref}
          onChange={eMailController.field.onChange}
          onBlur={eMailController.field.onBlur}
          error={eMailController.fieldState.error?.message}
          sizeVariant={InputSize.LARGE}
          placeholder="Add e-mail address"
        />
      </ContentContainer>

      <ContentContainer>
        <CustomInput
          label="Password"
          name={passwordController.field.name}
          value={passwordController.field.value}
          ref={passwordController.field.ref}
          onChange={passwordController.field.onChange}
          onBlur={passwordController.field.onBlur}
          error={passwordController.fieldState.error?.message}
          sizeVariant={InputSize.LARGE}
          type="password"
          placeholder="Password"
        />
      </ContentContainer>

      <ContentContainer>
        <CustomInput
          label="Confirm Password"
          name={confirmPasswordController.field.name}
          value={confirmPasswordController.field.value}
          ref={confirmPasswordController.field.ref}
          onChange={confirmPasswordController.field.onChange}
          onBlur={confirmPasswordController.field.onBlur}
          error={confirmPasswordController.fieldState.error?.message}
          sizeVariant={InputSize.LARGE}
          type="password"
          placeholder="Confirm Password"
        />
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: 20px;
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`
