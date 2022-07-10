import { useState } from 'react'
import styled from 'styled-components'

import { useGetFaceSerumsProductsQuery } from '../../../../redux/api'
import { Product } from '../../../../types'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../Components/ProductsListWrapper/ProductsListWrapper'

const FaceSerumsProductsPage = () => {
  const { data: faceSerumsProducts } = useGetFaceSerumsProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  return (
    <Container>
      <LargeHeader
        title="Skincare - Face Serums"
        description="Best-in-class active ingredients to brighten, boost hydration, and address skin aging. Explore effective and natural face serums for dry skin, acne, and anti-aging."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={faceSerumsProducts}
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

export default FaceSerumsProductsPage
