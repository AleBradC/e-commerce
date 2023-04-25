import { useState } from 'react'
import styled from 'styled-components'

import { useGetLipSticksProductsQuery } from '../../../../redux/api'
import { ProductType } from '../../../../helpers/types'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const LipSticksProductsPage = () => {
  const {
    data: lipSticksProducts,
    isLoading: lipSticksProductsIsLoading,
    isFetching: lipSticksProductsIsFetching,
  } = useGetLipSticksProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  if (lipSticksProductsIsLoading || lipSticksProductsIsFetching) {
    return <Loading smallSpinner />
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

export default LipSticksProductsPage
