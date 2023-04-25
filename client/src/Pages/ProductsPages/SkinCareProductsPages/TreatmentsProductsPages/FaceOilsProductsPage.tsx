import { useState } from 'react'
import styled from 'styled-components'

import { useGetFaceOilsProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../helpers/types'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const FaceOilsProductsPage = () => {
  const {
    data: faceOilsProducts,
    isLoading: faceOilsProductsIsLoading,
    isFetching: faceOilsProductsIsFetching,
  } = useGetFaceOilsProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  if (faceOilsProductsIsLoading || faceOilsProductsIsFetching) {
    return <Loading smallSpinner />
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

export default FaceOilsProductsPage
