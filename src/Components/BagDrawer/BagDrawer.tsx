import { forwardRef, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { bagRoute } from '../../Helpers/routes'
import { useAppDispatch } from '../../redux/hooks'
import { toggleBagDrawer } from '../../redux/reducers/bagDrawerSlice'
import { IconButton, IconButtonType } from '../IconButton/IconButton'
import { Button } from '../Button/Button'

export interface BagDrawerProps {
  children: ReactNode
  isOpen: boolean
  clearAll: () => void
  subTotal: number | undefined
  numberOfProducts: number | undefined
}

export const BagDrawer = forwardRef<HTMLDivElement, BagDrawerProps>(
  ({ children, isOpen, clearAll, subTotal, numberOfProducts }, ref) => {
    const dispatch = useAppDispatch()
    const navigateTo = useNavigate()

    const portalRoot = document.getElementById('portal')

    const handleClose = () => {
      dispatch(toggleBagDrawer(false))

      // when bag drawer is close
      document.body.style.overflow = 'unset'
    }

    if (isOpen) {
      // disabled scroll
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden'
      }
    }

    const redirectToBagPage = () => {
      navigateTo(bagRoute)
    }

    return isOpen && portalRoot
      ? ReactDOM.createPortal(
          <BlurWrapper>
            <Container ref={ref}>
              <Header>
                <Title> Your cart ({numberOfProducts})</Title>
                <StyledIconButton variant={IconButtonType.CLOSE} onClick={handleClose} />
                <ShippingContainer> Congratulations, you`ve earned FREE shipping </ShippingContainer>
                {/*to do*/}
              </Header>

              <Content>{children}</Content>

              <Footer>
                <SubtotalContainer>
                  <SubtotalTitle> Subtotal </SubtotalTitle>
                  <Price> ${subTotal} </Price>
                </SubtotalContainer>
                <ButtonContainer>
                  <StyledButton onClick={redirectToBagPage}> View Cart </StyledButton>
                  <ClearAllButton onClick={clearAll}> Clear All </ClearAllButton>
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
  top: 25px;
  right: 25px;
  z-index: 5;
  padding: 0;
`

const Title = styled.div`
  font-family: 'Tiro Telugu', serif;
  font-size: 24px;
`

const ShippingContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  text-align: center;
  font-weight: bold;

  color: ${props => props.theme.colors.greyDarker};
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
  width: 100%;
`

const SubtotalTitle = styled.span`
  font-family: 'Tiro Telugu', serif;
  font-size: 18px;
`

const Price = styled.span`
  font-family: 'Tiro Telugu', serif;
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

  font-size: 16px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

BagDrawer.displayName = 'BagDrawer'
