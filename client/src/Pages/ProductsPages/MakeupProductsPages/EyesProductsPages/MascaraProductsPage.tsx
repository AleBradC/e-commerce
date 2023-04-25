import { useState } from 'react'
import styled from 'styled-components'

import { ProductType } from '../../../../helpers/types'
import { useGetMascaraProductsQuery } from '../../../../redux/api'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const MascaraProductsPage = () => {
  const {
    data: mascaraProducts,
    isLoading: mascaraProductsIsLoading,
    isFetching: mascaraProductsIsFetching,
  } = useGetMascaraProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  if (mascaraProductsIsLoading || mascaraProductsIsFetching) {
    return <Loading smallSpinner />
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

export default MascaraProductsPage
