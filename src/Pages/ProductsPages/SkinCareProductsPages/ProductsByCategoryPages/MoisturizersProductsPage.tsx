import { useState } from 'react'
import styled from 'styled-components'

import { useGetMoisturizersProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../Components/ProductsListWrapper/ProductsListWrapper'

const MoisturizersProductsPage = () => {
  const { data: moisturizersProducts } = useGetMoisturizersProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  return (
    <Container>
      <LargeHeader
        title="Skincare - Moisturizers"
        description="Hero hydration to soothe, add suppleness, amplify moisturize, and increase skin barrier function. Shop the best hydrating and natural face moisturizers approved by SHEN."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={moisturizersProducts}
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

export default MoisturizersProductsPage
