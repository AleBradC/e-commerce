import { useState } from 'react'
import styled from 'styled-components'

import { useGetLipGlossesProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../helpers/types'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const LipGlossesProductsPage = () => {
  const {
    data: lipGlossesProducts,
    isLoading: lipGlossesProductsIsLoading,
    isFetching: lipGlossesProductsIsFetching,
  } = useGetLipGlossesProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  if (lipGlossesProductsIsLoading || lipGlossesProductsIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <Container>
      <LargeHeader
        title="Luxury Lip Gloss, Natural Lip Tints"
        description="Gloss, tints, and shine for lips that go on for days. Shop natural tinted lip gloss and luxury lip oils."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={lipGlossesProducts}
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

export default LipGlossesProductsPage
