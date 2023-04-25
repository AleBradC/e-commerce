import { useState } from 'react'
import styled from 'styled-components'

import { useGetCleansersProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../helpers/types'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const CleansersProductsPage = () => {
  const {
    data: cleansersProducts,
    isLoading: cleansersProductsIsLoading,
    isFetching: cleansersProductsIsFetching,
  } = useGetCleansersProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredResult = (resultProducts: ProductType[] | undefined) => {
    setFilteredProducts(resultProducts)
  }

  if (cleansersProductsIsLoading || cleansersProductsIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <Container>
      <LargeHeader
        title="Skincare - Cleansers"
        description="Top-rated cleansers to remove makeup, unclog pores, exfoliate dead skin, and target skin conditions. Discover natural cleansers, and effective face wipes, foaming face wash, and oil and gel cleansers."
        filteredProductsResult={handleFilteredResult}
        numberOfProducts={filteredProducts?.length}
        products={cleansersProducts}
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

export default CleansersProductsPage
