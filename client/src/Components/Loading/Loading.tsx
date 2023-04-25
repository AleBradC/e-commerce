import styled, { css } from 'styled-components'
import { SpinnerCircularSplit } from 'spinners-react'

export interface LoadingProps {
  smallSpinner?: boolean
  className?: string
  fullScreen?: boolean
}

const Loading: React.FC<LoadingProps> = ({ smallSpinner, className, fullScreen }) => {
  return (
    <FullScreenContainer fullScreen={fullScreen}>
      <SpinnerWrapper className={className} fullScreen={fullScreen}>
        <SpinnerCircularSplit
          size={smallSpinner ? '18' : '50'}
          thickness={100}
          speed={100}
          color="rgba(51, 51, 51, 1)"
          secondaryColor="rgba(250, 247, 246, 1)"
        />
      </SpinnerWrapper>
    </FullScreenContainer>
  )
}

const FullScreenContainer = styled.div<{ fullScreen?: boolean }>`
  ${props =>
    props.fullScreen &&
    css`
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;

      z-index: 10000;
      background: ${props => props.theme.colors.white};
    `}
`

const SpinnerWrapper = styled.div<{ fullScreen?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  ${props =>
    props.fullScreen &&
    css`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    `}
`

export default Loading
