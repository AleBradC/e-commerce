import { useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'

const MascaraProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const mascaraProducts = filteredProducts?.filter(product => product.category === 'Mascara')

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  const brands = [...new Set(mascaraProducts?.map(product => product.brand))]
  const concerns = [...new Set(mascaraProducts?.map(product => product.tags).flat())]

  return (
    <Container>
      <LargeHeader
        title="Makeup - Eyes - Mascara"
        description="Arguably the most indispensable makeup item, these mascaras deliver length, volume, curl, and even waterproof wear. Explore natural, organic, and high end mascara for sensitive eyes."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={mascaraProducts?.length}
        brands={brands}
        concerns={concerns}
      />
      <ProductsList>
        {mascaraProducts?.map((product, index) => (
          <ProductCard
            key={index}
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

export default MascaraProductsPage
