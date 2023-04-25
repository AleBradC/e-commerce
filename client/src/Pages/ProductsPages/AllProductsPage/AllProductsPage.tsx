import { useState } from 'react'
import styled from 'styled-components'

import { useGetProductsQuery } from '../../../redux/api'
import { ProductType } from '../../../helpers/types'
import { LargeHeader } from '../../../components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { Button } from '../../../components/Button/Button'
import { ProductsListWrapper } from '../../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../../components/Loading/Loading'

const AllProductsPage = () => {
  const {
    data: allProducts,
    isLoading: allProductsIsLoading,
    isFetching: allProductsIsFetching,
  } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])
  const [showMore, setShowMore] = useState(false)

  const filteredProductsResult = showMore ? filteredProducts : filteredProducts?.slice(0, 8)

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  if (allProductsIsLoading || allProductsIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <Container>
      <LargeHeader
        title="All products"
        description="Access to signature exclusives and the essentials of tomorrow, before everyone else. Discover the hottest new beauty, makeup, and skincare products."
        filteredProductsResult={handleFilteredProducts}
        numberOfProducts={filteredProducts?.length}
        products={allProducts}
      />
      <ProductsListWrapper>
        {filteredProductsResult?.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.name}
            tags={product.tags}
            imageURL={product.imageURL}
            hoverImageURL={product.hoverImageURL}
            rating={product.rating}
            price={product.price}
            principalBenefits={product.principalBenefits}
          />
        ))}
      </ProductsListWrapper>

      <ShowMoreContainer onClick={toggleShowMore}>
        <Button> {showMore ? 'SHOW LESS' : 'SHOW MORE'} </Button>
      </ShowMoreContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ShowMoreContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 20px 0;
`

export default AllProductsPage
