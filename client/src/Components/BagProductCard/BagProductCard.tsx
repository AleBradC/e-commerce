import styled from 'styled-components'
import Loading from '../Loading/Loading'

export interface BagProductCardProps {
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

export const BagProductCard: React.FC<BagProductCardProps> = ({
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
      <ContentContainer>
        <DetailsContainer>
          <ProductBrand> {brand.toUpperCase()} </ProductBrand>
          <ProductName> {name} </ProductName>
        </DetailsContainer>
        <RightContainer>
          <ActionContainer>
            <Input>
              <InputButton onClick={decreaseQuantity}> - </InputButton>
              <Quantity> {quantity} </Quantity>
              <InputButton onClick={increaseQuantity}> + </InputButton>
            </Input>
          </ActionContainer>
          <RemoveButton onClick={deleteProduct}> {isLoading ? <Loading smallSpinner /> : 'Remove'} </RemoveButton>
          <Price> ${price} </Price>
        </RightContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
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

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 6px 20px;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  max-width: 150px;
  width: 100%;
`

const ProductBrand = styled.div`
  margin-bottom: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: ${props => props.theme.colors.grey4};
`

const ProductName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  color: ${props => props.theme.colors.black};
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-basis: 60%;
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  font-size: 14px;
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
