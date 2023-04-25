import { useCallback } from 'react'
import styled from 'styled-components'

import {
  useDecreaseQuantityMutation,
  useDeleteAllProductsFromCartMutation,
  useDeleteProductsFromCartMutation,
  useGetProductsCartQuery,
  useIncreaseQuantityMutation,
} from '../../redux/api'
import { BagProductCard } from '../../components/BagProductCard/BagProductCard'
import { Button } from '../../components/Button'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar'
import { maxSumForFreeShipping, standardShopping } from '../../helpers/variables'
import Loading from '../../components/Loading/Loading'

const BagPage = () => {
  const {
    data: cartProducts,
    isLoading: cartProductsIsLoading,
    isFetching: cartProductsIsFetching,
  } = useGetProductsCartQuery()

  const [deleteAllProductsFromCart, { isLoading: deleteAllProductsFromCartIsLoading }] =
    useDeleteAllProductsFromCartMutation()
  const [deleteProductsFromCart, { isLoading: deleteProductsFromCartIsLoading }] = useDeleteProductsFromCartMutation()
  const [decreaseQuantity] = useDecreaseQuantityMutation()
  const [increaseQuantity] = useIncreaseQuantityMutation()

  const subTotal = cartProducts?.reduce((sum, product) => {
    sum += product.quantity * product.price

    return sum
  }, 0)

  const numberOfProducts = cartProducts?.reduce((sum, product) => {
    sum += product.quantity

    return sum
  }, 0)

  const remainingSum = subTotal && maxSumForFreeShipping - subTotal

  const total = subTotal && subTotal >= maxSumForFreeShipping ? subTotal : subTotal && subTotal + standardShopping

  const decreaseProductQuantity = useCallback(
    async (productId: number) => {
      await decreaseQuantity({
        id: productId,
      })
    },
    [decreaseQuantity]
  )

  const increaseProductQuantity = useCallback(
    async (productId: number) => {
      await increaseQuantity({
        id: productId,
      })
    },
    [increaseQuantity]
  )

  const deleteProductFromCart = useCallback(
    async (productId: number) => {
      await deleteProductsFromCart({
        id: productId,
      })
    },
    [deleteProductsFromCart]
  )

  const clearAll = useCallback(async () => {
    await deleteAllProductsFromCart()
  }, [deleteAllProductsFromCart])

  if (cartProductsIsLoading || cartProductsIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <Container>
      <Header>
        <Title> Your cart ({numberOfProducts}) </Title>
        <Subtitle>
          {subTotal && subTotal < maxSumForFreeShipping ? (
            <ShippingText>
              Only spend <RemainingSum> ${remainingSum} </RemainingSum> more for FREE shipping
            </ShippingText>
          ) : (
            <ShippingText>Congratulations, you`ve earned FREE shipping</ShippingText>
          )}
        </Subtitle>
        <ProgressBarContainer>
          <ProgressBar totalSum={subTotal} />
        </ProgressBarContainer>
      </Header>
      <ContentContainer>
        <ProductsListContainer>
          <ProductsListHeader>
            <HeaderItem>Product</HeaderItem>
            <HeaderItem>Quantity</HeaderItem>
            <HeaderItem>Price</HeaderItem>
          </ProductsListHeader>
          <ProductsList>
            {cartProducts?.map(product => (
              <BagProductCard
                key={product.id}
                imageURL={product.imageURL}
                brand={product.brand}
                name={product.name}
                quantity={product.quantity}
                price={product.price}
                deleteProduct={() => deleteProductFromCart(product.id)}
                increaseQuantity={() => increaseProductQuantity(product.id)}
                decreaseQuantity={() => decreaseProductQuantity(product.id)}
                isLoading={deleteProductsFromCartIsLoading}
              />
            ))}
          </ProductsList>
        </ProductsListContainer>
        <OrderSummary>
          <OrderSummaryHeader>
            <HeaderItem> Order summary </HeaderItem>
          </OrderSummaryHeader>
          <OrderSummaryBody>
            <OrderSummaryItem>
              <Span> SUBTOTAL </Span>
              <Span> ${subTotal} </Span>
            </OrderSummaryItem>
            <OrderSummaryItem>
              <Span> SHIPPING </Span>
              <Span> {subTotal && subTotal >= maxSumForFreeShipping ? 'FREE' : `$${standardShopping}`} </Span>
            </OrderSummaryItem>
            <OrderSummaryFooterBody>
              <Total> TOTAL </Total>
              <Span> ${total} </Span>
            </OrderSummaryFooterBody>
            <Button> CHECKOUT </Button>
            <ClearAllButton onClick={clearAll}>
              {deleteAllProductsFromCartIsLoading ? <Loading smallSpinner /> : 'Clear All'}
            </ClearAllButton>
          </OrderSummaryBody>
        </OrderSummary>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 32px 68px 68px 68px;

  background-image: linear-gradient(${props => props.theme.colors.white} 10%, rgba(248, 235, 227, 0.8) 100%);
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`

const Title = styled.span`
  margin-bottom: 12px;
  font-size: 32px;
  font-family: 'Optima', sans-serif;
`

const Subtitle = styled.span`
  margin-bottom: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;

  color: ${props => props.theme.colors.grey4};
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
  max-width: 350px;
  width: 100%;
  padding: 20px;
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  //flex-wrap: wrap;
`

const ProductsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  padding: 0 10rem 0 0;
`

const ProductsListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;

  border-bottom: 1px solid ${props => props.theme.colors.grey4};
`

const ProductsList = styled.div``

const HeaderItem = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  width: 100%;
`

const OrderSummaryHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 8px;

  border-bottom: 1px solid ${props => props.theme.colors.grey4};
`

const OrderSummaryBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 0 30px 0;

  width: 100%;
`

const OrderSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0 6px 0;
`

const Span = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const OrderSummaryFooterBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 0 18px 0;

  border-top: 1px solid ${props => props.theme.colors.grey4};
`

const Total = styled.span`
  font-family: 'Montserrat', sans-serif;
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

export default BagPage
