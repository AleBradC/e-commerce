import { useState } from 'react'
import styled from 'styled-components'

import { useGetFaceSerumsProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../helpers/types'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const FaceSerumsProductsPage = () => {
  const {
    data: faceSerumsProducts,
    isLoading: faceSerumsProductsIsLoading,
    isFetching: faceSerumsProductsIsFetching,
  } = useGetFaceSerumsProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  if (faceSerumsProductsIsLoading || faceSerumsProductsIsFetching) {
    return <Loading smallSpinner />
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
            principalBenefits={product.principalBenefits}
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
