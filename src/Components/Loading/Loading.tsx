import styled, { css, keyframes } from 'styled-components'

export enum Size {
    SMALL = 5,
    LARGE = 10
}

export interface LoadingProps {
    size: Size,
    className?: string
    fullScreen?: boolean
}

const Loading: React.FC<LoadingProps> = ({size, className, fullScreen}) => {

    return (
        <DotWrapper className={className} fullScreen={fullScreen}>
            <Dot delay="0s" size={size}/>
            <Dot delay=".1s" size={size}/>
            <Dot delay=".2s" size={size}/>
        </DotWrapper>
    )
}

const DotWrapper = styled.div<{fullScreen?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  ${props => props.fullScreen && css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;

    backdrop-filter: blur(6px);
  `}
`

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const Dot = styled.div<{delay: string, size: Size}>`
  background-color: black;
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 2px;
  
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;


export default Loading
