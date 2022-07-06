import { useState } from 'react'
import styled from 'styled-components'

import { useGetBrowsProductsQuery } from '../../../../redux/api'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { Product } from '../../../../types'

const BrowsProductsPage = () => {
  const { data: browsProducts } = useGetBrowsProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])

  const handleFilteredProducts = (receivedProducts: Product[] | undefined) => {
    setFilteredProducts(receivedProducts)
  }

  return (
    <Container>
      <LargeHeader
        title="Vegan & Natural Eyebrow Makeup"
        description="Shape, shade, groom, and condition your brows with the best in brow tools and products. Discover our collection of eyebrow makeup with natural and vegan eyebrow pencils and gels."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={browsProducts}
      />
      <ProductsList>
        {filteredProducts?.map((product, index) => (
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

export default BrowsProductsPage
