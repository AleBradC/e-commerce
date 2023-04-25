import styled, { css } from 'styled-components'

export interface AccordionProps {
  content: string | undefined
  summary: string
  isExpended: boolean
  toggleAccordion: () => void
}

export const Accordion: React.FC<AccordionProps> = ({ content, summary, isExpended, toggleAccordion }) => {
  return (
    <AccordionContainer>
      <AccordionItem>
        <AccordionSummary isExpended={isExpended} onClick={toggleAccordion}>
          <Summary>{summary}</Summary>
          <Icon>{isExpended ? '-' : '+'}</Icon>
        </AccordionSummary>
        {isExpended && <AccordionContent isExpended={isExpended}>{content}</AccordionContent>}
      </AccordionItem>
    </AccordionContainer>
  )
}

const AccordionContainer = styled.div`
  width: 100%;
`

const AccordionItem = styled.div`
  line-height: 1;
`

const AccordionSummary = styled.div<{ isExpended: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 0;

  cursor: pointer;
  ${props =>
    !props.isExpended &&
    css`
      border-bottom: 1px solid ${props => props.theme.colors.black};
    `}
`

const Summary = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: bold;
`

const Icon = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 34px;
`

const AccordionContent = styled.div<{ isExpended: boolean }>`
  margin-top: 4px;
  padding-bottom: 16px;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 1.4rem;
  word-break: break-word;

  ${props =>
    props.isExpended &&
    css`
      border-bottom: 1px solid ${props => props.theme.colors.black};
    `}
`
