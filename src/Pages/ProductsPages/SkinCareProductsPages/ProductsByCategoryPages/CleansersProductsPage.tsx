import { useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'

const CleansersProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const cleansersProducts = filteredProducts?.filter(product => product.category === 'Cleansers')

  const handleFilteredResult = (resultProducts: Product[] | undefined) => {
    setFilteredProducts(resultProducts)
  }

  const brands = [...new Set(cleansersProducts?.map(product => product.brand))]
  const concerns = [...new Set(cleansersProducts?.map(product => product.tags).flat())]

  return (
    <Container>
      <LargeHeader
        title="Skincare - Cleansers"
        description="Top-rated cleansers to remove makeup, unclog pores, exfoliate dead skin, and target skin conditions. Discover natural cleansers, and effective face wipes, foaming face wash, and oil and gel cleansers."
        filteredProductsResult={handleFilteredResult}
        numberOfProducts={cleansersProducts?.length}
        brands={brands}
        concerns={concerns}
      />
      <ProductsList>
        {cleansersProducts?.map((product, index) => (
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

export default CleansersProductsPage
