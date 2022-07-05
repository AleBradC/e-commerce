import { useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'

const FaceSerumsProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const faceSerumsProducts = filteredProducts?.filter(product => product.category === 'Face Serums')

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  const brands = [...new Set(faceSerumsProducts?.map(product => product.brand))]
  const concerns = [...new Set(faceSerumsProducts?.map(product => product.tags).flat())]

  return (
    <Container>
      <LargeHeader
        title="Skincare - Face Serums"
        description="Best-in-class active ingredients to brighten, boost hydration, and address skin aging. Explore effective and natural face serums for dry skin, acne, and anti-aging."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={faceSerumsProducts?.length}
        brands={brands}
        concerns={concerns}
      />
      <ProductsList>
        {faceSerumsProducts?.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
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

export default FaceSerumsProductsPage
