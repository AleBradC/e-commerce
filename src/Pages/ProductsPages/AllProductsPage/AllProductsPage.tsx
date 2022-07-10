import { useState } from 'react'
import styled from 'styled-components'

import { useGetProductsQuery } from '../../../redux/api'
import { Product } from '../../../types'
import { LargeHeader } from '../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../Components/ProductCard/ProductCard'
import { Button } from '../../../Components/Button/Button'
import { ProductsListWrapper } from '../../../Components/ProductsListWrapper/ProductsListWrapper'

const AllProductsPage = () => {
  const { data: allProducts } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const [showMore, setShowMore] = useState(false)

  const filteredProductsResult = showMore ? filteredProducts : filteredProducts?.slice(0, 8)

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  const toggleShowMore = () => {
    setShowMore(!showMore)
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
        {filteredProductsResult?.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            brand={product.brand}
            name={product.name}
            tags={product.tags}
            imageURL={product.imageURL}
            hoverImageURL={product.hoverImageURL}
            rating={product.rating}
            price={product.price}
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
