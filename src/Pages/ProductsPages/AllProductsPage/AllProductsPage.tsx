import { useState } from 'react'
import styled from 'styled-components'

import { useGetProductsQuery } from '../../../redux/api'
import { Product } from '../../../types'
import { LargeHeader } from '../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../Components/ProductCard/ProductCard'
import { Button } from '../../../Components/Button/Button'

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
      <ProductsList>
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
      </ProductsList>

      <ShowMoreContainer onClick={toggleShowMore}>
        <Button> {showMore ? 'SHOW LESS' : 'SHOW MORE'} </Button>
      </ShowMoreContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-image: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.beigeLight},
    ${props => props.theme.colors.beige2},
    ${props => props.theme.colors.beige3},
    ${props => props.theme.colors.beige}
  );
`

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(286px, 1fr));
  grid-gap: 30px;
  max-width: 1360px;
  width: 100%;
  padding: 60px 20px 20px 20px;
  margin: 0 auto;
`

const ShowMoreContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 20px 0;
`

export default AllProductsPage
