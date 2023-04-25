import styled from 'styled-components'
import { Option } from './Option'
import { Control, useController } from 'react-hook-form'

import { PreferencesOptions, SocialMediaOptions } from '../../types'
import { RegistrationFirstStepFormField } from '../../RegisterPage'

export interface SecondStepProps {
  formControl: Control<RegistrationFirstStepFormField>
}

export const SecondStep: React.FC<SecondStepProps> = ({ formControl }) => {
  const socialMediaOptionsController = useController({
    name: 'socialMediaOption',
    control: formControl,
    rules: {
      required: { value: true, message: 'Please choose one' },
    },
  })

  const preferencesOptionsController = useController({
    name: 'preferencesOption',
    control: formControl,
    rules: {
      required: { value: true, message: 'Please choose one' },
    },
  })

  const handleSocialMediaSelectOption = (option: SocialMediaOptions) => {
    if (!socialMediaOptionsController.field.value.includes(option)) {
      socialMediaOptionsController.field.onChange([...socialMediaOptionsController.field.value, option])
    } else {
      socialMediaOptionsController.field.onChange(
        socialMediaOptionsController.field.value.filter((selectedOption: string) => selectedOption !== option)
      )
    }
  }

  const handlePreferencesSelectOption = (option: PreferencesOptions) => {
    if (!preferencesOptionsController.field.value.includes(option)) {
      preferencesOptionsController.field.onChange([...preferencesOptionsController.field.value, option])
    } else {
      preferencesOptionsController.field.onChange(
        preferencesOptionsController.field.value.filter((selectedOption: string) => selectedOption !== option)
      )
    }
  }

  return (
    <Container>
      <Section>
        <Question> How did you find us ? </Question>
        <OptionSection>
          {Object.values(SocialMediaOptions).map((option: SocialMediaOptions) => (
            <Option
              key={option}
              isSelected={socialMediaOptionsController.field.value?.includes(option)}
              onSelect={() => handleSocialMediaSelectOption(option)}
            >
              {option}
            </Option>
          ))}
        </OptionSection>
        <ErrorMessage>{socialMediaOptionsController.fieldState.error?.message}</ErrorMessage>
      </Section>

      <Section>
        <Question> What type of products do you like ? </Question>
        <OptionSection>
          {Object.values(PreferencesOptions).map((option: PreferencesOptions) => (
            <Option
              key={option}
              isSelected={preferencesOptionsController.field.value?.includes(option)}
              onSelect={() => handlePreferencesSelectOption(option)}
            >
              {option}
            </Option>
          ))}
        </OptionSection>
        <ErrorMessage>{preferencesOptionsController.fieldState.error?.message}</ErrorMessage>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`

const Question = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`

const OptionSection = styled.div`
  display: grid;
  grid-gap: 18px 12px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin-top: 22px;
`

const ErrorMessage = styled.div`
  flex: 1;
  min-height: 16px;
  margin-top: 8px;
  margin-bottom: 12px;

  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.red};
  font-size: 12px;
`
