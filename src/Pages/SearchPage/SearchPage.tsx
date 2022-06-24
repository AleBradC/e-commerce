import styled from 'styled-components'

import { useGetProductsQuery } from '../../redux/api'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { LargeHeader } from '../../Components/LargeHeader/LargeHeader'

const SearchPage = () => {
  const { data: products } = useGetProductsQuery()

  // const sortByLowerPrice = () => {
  //   return products?.slice().sort((a, b) => a.price - b.price)
  // }
  //
  // const sortByHigherPrice = () => {
  //   return products?.slice().sort((a, b) => b.price - a.price)
  // }

  return (
    <Container>
      <LargeHeader
        title="Search results for"
        description="— TEST"
        numberOfItems={50}
        otherDetails={<SearchButton> Search again </SearchButton>}
      />
      <ProductsList>
        {products?.map(product => (
          <ProductCard
            key={product.id}
            brand={product.brand}
            name={product.name}
            tags={product.tags}
            imageURL={product.imageURL}
            hoverImageURL={product.hoverImageURL}
            rating={product.rating}
            price={product.price}
          />
        ))}
      </ProductsList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-image: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.beigeLight},
    ${props => props.theme.colors.beige2},
    ${props => props.theme.colors.beige3},
    ${props => props.theme.colors.beige}
  );
`

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(286px, 1fr));
  grid-gap: 30px;
  max-width: 1360px;
  width: 100%;
  padding: 60px 20px 20px 20px;
  margin: 0 auto;
`

const SearchButton = styled.button`
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  text-decoration: underline;
  background: none;
  border: none;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

export default SearchPage
