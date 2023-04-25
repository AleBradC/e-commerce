import styled from 'styled-components'
import Loading from '../Loading/Loading'

export interface SmallProductCardProps {
  imageURL: string
  brand: string
  name: string
  quantity: number
  price: number
  deleteProduct: () => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  isLoading: boolean
}

export const SmallProductCard: React.FC<SmallProductCardProps> = ({
  imageURL,
  brand,
  name,
  quantity,
  price,
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
  isLoading,
}) => {
  return (
    <Container>
      <Img src={imageURL} />

      <RightContainer>
        <DetailsContainer>
          <ProductBrand> {brand.toUpperCase()} </ProductBrand>
          <ProductName> {name} </ProductName>
        </DetailsContainer>

        <ActionContainer>
          <InputRemoveContainer>
            <Input>
              <InputButton onClick={decreaseQuantity}> - </InputButton>
              <Quantity> {quantity} </Quantity>
              <InputButton onClick={increaseQuantity}> + </InputButton>
            </Input>
            <RemoveButton onClick={deleteProduct}> {isLoading ? <Loading smallSpinner /> : 'Remove'} </RemoveButton>
          </InputRemoveContainer>

          <Price> ${price} </Price>
        </ActionContainer>
      </RightContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  padding: 12px 0 12px 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.beige};
`

const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  object-position: center;
`

const RightContainer = styled.div`
  padding: 0 0 0 14px;
  width: 100%;
`

const DetailsContainer = styled.div`
  padding: 3px 0 22px 0;
`

const ProductBrand = styled.div`
  margin-top: -4px;
  margin-bottom: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: ${props => props.theme.colors.grey4};
`

const ProductName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.colors.black};
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const InputRemoveContainer = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.div`
  display: flex;
  align-items: center;
`

const InputButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  border: none;
  background: none;
  font-size: 18px;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

const Quantity = styled.div`
  font-family: 'Montserrat', sans-serif;
  padding: 6px;
`

const RemoveButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  border: none;
  background: none;
  text-decoration: underline;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

const Price = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.colors.black};
`
