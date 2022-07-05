import { useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'

const LipGlossesProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const lipGlossesProducts = filteredProducts?.filter(product => product.category === 'Lip Glosses')

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  const brands = [...new Set(lipGlossesProducts?.map(product => product.brand))]
  const concerns = [...new Set(lipGlossesProducts?.map(product => product.tags).flat())]

  return (
    <Container>
      <LargeHeader
        title="Luxury Lip Gloss, Natural Lip Tints"
        description="Gloss, tints, and shine for lips that go on for days. Shop natural tinted lip gloss and luxury lip oils."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={lipGlossesProducts?.length}
        brands={brands}
        concerns={concerns}
      />
      <ProductsList>
        {lipGlossesProducts?.map((product, index) => (
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

export default LipGlossesProductsPage
