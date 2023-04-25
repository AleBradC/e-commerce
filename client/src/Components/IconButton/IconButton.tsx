import styled from 'styled-components'

import SearchIcon from '../../assets/icons/searchIcon.svg'
import BagIcon from '../../assets/icons/bag.svg'
import MobileBag from '../../assets/icons/mobileMenu.svg'
import CloseIcon from '../../assets/icons/x.svg'

export enum IconButtonType {
  SEARCH = 'search',
  BAG = 'bag',
  MOBILE_BAG = 'mobileBag',
  CLOSE = 'closeIcon',
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: IconButtonType
  className?: string
}

const iconVariants = {
  [IconButtonType.SEARCH]: SearchIcon,
  [IconButtonType.BAG]: BagIcon,
  [IconButtonType.MOBILE_BAG]: MobileBag,
  [IconButtonType.CLOSE]: CloseIcon,
}

export const IconButton: React.FC<IconButtonProps> = ({ variant, className, ...htmlButtonProps }) => {
  return (
    <ButtonContainer {...htmlButtonProps} className={className}>
      <ButtonIcon src={iconVariants[variant]} alt="icon-button" />
    </ButtonContainer>
  )
}

const ButtonContainer = styled.button`
  border: none;
  background: none;
`

const ButtonIcon = styled.img`
  width: 20px;
  height: 25px;
  display: block;
  padding: 0;
`
