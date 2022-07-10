import { useState } from 'react'
import styled from 'styled-components'

import { useGetFaceOilsProductsQuery } from '../../../../redux/api'
import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../Components/ProductsListWrapper/ProductsListWrapper'

const FaceOilsProductsPage = () => {
  const { data: faceOilsProducts } = useGetFaceOilsProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  return (
    <Container>
      <LargeHeader
        title="Best Luxurious & Vegan Face Oils"
        description="Luxurious face oils to seal-in skincare, prevent water loss, and protect outer layers of the skin. Discover the best beauty oils at SHEN Beauty."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={faceOilsProducts}
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

export default FaceOilsProductsPage
