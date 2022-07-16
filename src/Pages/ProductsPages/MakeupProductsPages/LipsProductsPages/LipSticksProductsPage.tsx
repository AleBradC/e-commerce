import { useState } from 'react'
import styled from 'styled-components'

import { useGetLipSticksProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../Components/ProductsListWrapper/ProductsListWrapper'

const LipSticksProductsPage = () => {
  const { data: lipSticksProducts } = useGetLipSticksProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  return (
    <Container>
      <LargeHeader
        title="Luxury & Vegan Lipstick & Lip Color"
        description="Bold, rich, creamy color for multi-faceted lip looks. Explore luxury and vegan lipstick to give you that perfect lip color."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={lipSticksProducts}
      />
      <ProductsListWrapper>
        {filteredProducts?.map(product => (
          <ProductCard
            key={product.id}
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
      </ProductsListWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default LipSticksProductsPage
