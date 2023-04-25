import { useState } from 'react'
import styled from 'styled-components'

import { ProductType } from '../../../../helpers/types'
import { useGetBrowsProductsQuery } from '../../../../redux/api'
import { LargeHeader } from '../../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../components/ProductCard/ProductCard'
import { ProductsListWrapper } from '../../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../../components/Loading/Loading'

const BrowsProductsPage = () => {
  const {
    data: browsProducts,
    isLoading: browsProductsIsLoading,
    isFetching: browsProductsIsFetching,
  } = useGetBrowsProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (receivedProducts: ProductType[] | undefined) => {
    setFilteredProducts(receivedProducts)
  }

  if (browsProductsIsLoading || browsProductsIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <Container>
      <LargeHeader
        title="Vegan & Natural Eyebrow Makeup"
        description="Shape, shade, groom, and condition your brows with the best in brow tools and products. Discover our collection of eyebrow makeup with natural and vegan eyebrow pencils and gels."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={browsProducts}
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

export default BrowsProductsPage
