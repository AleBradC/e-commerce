import ReactDOM from 'react-dom'
import { forwardRef, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { maxSumForFreeShipping } from '../../helpers/variables'
import { bagRoute } from '../../helpers/routes'
import { useAppDispatch } from '../../redux/hooks'
import { toggleBagDrawer } from '../../redux/reducers/bagDrawerSlice'
import { IconButton, IconButtonType } from '../IconButton/IconButton'
import { Button } from '../Button/Button'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import Loading from '../Loading/Loading'

export interface BagDrawerProps {
  children: ReactNode
  isOpen: boolean
  clearAll: () => void
  subTotal: number | undefined
  numberOfProducts: number | undefined
  isLoading: boolean
}

export const BagDrawer = forwardRef<HTMLDivElement, BagDrawerProps>(
  ({ children, isOpen, clearAll, subTotal, numberOfProducts, isLoading }, ref) => {
    const dispatch = useAppDispatch()
    const navigateTo = useNavigate()

    const portalRoot = document.getElementById('portal')
    const remainingSum = subTotal && maxSumForFreeShipping - subTotal

    if (isOpen) {
      // disabled scroll
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden'
      }
    }

    const handleClose = () => {
      dispatch(toggleBagDrawer(false))

      // when bag drawer is close
      document.body.style.overflow = 'unset'
    }

    const redirectToBagPage = () => {
      navigateTo(bagRoute)

      dispatch(toggleBagDrawer(false))
      // when bag drawer is close
      document.body.style.overflow = 'unset'
    }

    return isOpen && portalRoot
      ? ReactDOM.createPortal(
          <BlurWrapper>
            <Container ref={ref}>
              <Header>
                <Title> Your cart ({numberOfProducts})</Title>
                <StyledIconButton variant={IconButtonType.CLOSE} onClick={handleClose} />
                <ShippingContainer>
                  {subTotal && subTotal < maxSumForFreeShipping ? (
                    <ShippingText>
                      Only spend <RemainingSum> ${remainingSum} </RemainingSum> more for FREE shipping
                    </ShippingText>
                  ) : (
                    <ShippingText>Congratulations, you`ve earned FREE shipping</ShippingText>
                  )}
                </ShippingContainer>
                <ProgressBarContainer>
                  <ProgressBar totalSum={subTotal} />
                </ProgressBarContainer>
              </Header>

              <Content>{children}</Content>

              <Footer>
                <SubtotalContainer>
                  <SubtotalTitle> Subtotal </SubtotalTitle>
                  <Price> ${subTotal} </Price>
                </SubtotalContainer>
                <ButtonContainer>
                  <StyledButton onClick={redirectToBagPage}> VIEW CART </StyledButton>
                  <ClearAllButton onClick={clearAll}>
                    {isLoading ? <Loading smallSpinner /> : 'Clear All'}
                  </ClearAllButton>
                </ButtonContainer>
              </Footer>
            </Container>
          </BlurWrapper>,
          portalRoot
        )
      : null
  }
)

const BlurWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  z-index: ${props => props.theme.zIndex.others};
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.5);
`

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 375px;
  width: 100%;
  height: 100%;
  
  background: ${props => props.theme.colors.beigeLight2};
}
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px;
  width: 100%;

  box-sizing: border-box;
  border-bottom: 1px solid ${props => props.theme.colors.beige};
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 20px;
  padding: 0;

  z-index: ${props => props.theme.zIndex.others};
`

const Title = styled.div`
  font-family: 'Optima', sans-serif;
  font-size: 24px;
`

const ShippingContainer = styled.div`
  text-align: center;
`

const ShippingText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: bold;

  color: ${props => props.theme.colors.greyDarker};
`
const RemainingSum = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: bold;

  color: ${props => props.theme.colors.brownBadge};
`

const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 20px;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  width: 100%;

  box-sizing: border-box;
  overflow-y: auto;
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  width: 100%;

  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.colors.black};
`

const SubtotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
`

const SubtotalTitle = styled.span`
  font-family: 'Optima', sans-serif;
  font-size: 18px;
`

const Price = styled.span`
  font-family: 'Optima', sans-serif;
  font-size: 18px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const ClearAllButton = styled.button`
  background: none;
  border: none;
  margin-top: 8px;

  font-size: 14px;
  text-transform: uppercase;
  font-weight: bolder;
  font-family: 'Montserrat', sans-serif;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

BagDrawer.displayName = 'BagDrawer'
