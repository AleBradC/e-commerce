import { useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../../../types'
import { useGetMascaraProductsQuery } from '../../../../redux/api'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../Components/ProductsListWrapper/ProductsListWrapper'

const MascaraProductsPage = () => {
  const { data: mascaraProducts } = useGetMascaraProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  return (
    <Container>
      <LargeHeader
        title="Makeup - Eyes - Mascara"
        description="Arguably the most indispensable makeup item, these mascaras deliver length, volume, curl, and even waterproof wear. Explore natural, organic, and high end mascara for sensitive eyes."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={mascaraProducts}
      />
      <ProductsListWrapper>
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
      </ProductsListWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default MascaraProductsPage
