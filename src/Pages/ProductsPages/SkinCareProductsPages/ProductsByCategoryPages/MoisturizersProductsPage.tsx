import { useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { NotFoundScreen } from '../../../../Components/NotFoundScreen/NotFoundScreen'

const MoisturizersProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const moisturizersProducts = filteredProducts?.filter(product => product.category === 'Moisturizers')

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  const brands = [...new Set(moisturizersProducts?.map(product => product.brand))]
  const concerns = [...new Set(moisturizersProducts?.map(product => product.tags).flat())]

  return (
    <Container>
      <LargeHeader
        title="Skincare - Moisturizers"
        description="Hero hydration to soothe, add suppleness, amplify moisturize, and increase skin barrier function. Shop the best hydrating and natural face moisturizers approved by SHEN."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={moisturizersProducts?.length}
        brands={brands}
        concerns={concerns}
      />
      <ProductsList>
        {moisturizersProducts?.map((product, index) => (
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
        {!moisturizersProducts?.length && <NotFoundScreen />}
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

export default MoisturizersProductsPage
