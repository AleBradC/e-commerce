import styled from 'styled-components'

import { useGetProductsQuery } from '../../../../redux/api'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'

const FaceOilsProductsPage = () => {
  const { data: allProducts } = useGetProductsQuery()

  const faceOilsProducts = allProducts?.filter(product => product.category === 'Face Oils')

  return (
    <Container>
      <LargeHeader title="Search results for" numberOfItems={faceOilsProducts?.length} />
      <ProductsList>
        {faceOilsProducts?.map(product => (
          <ProductCard
            key={product.id}
            brand={product.brand}
            name={product.name}
            tags={product.tags}
            imageURL={`${'../../../../../' + product.imageURL}`}
            hoverImageURL={`${'../../../../../' + product.hoverImageURL}`}
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

export default FaceOilsProductsPage
