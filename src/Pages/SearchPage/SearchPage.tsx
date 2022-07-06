import { useState } from 'react'
import styled from 'styled-components'

import { useGetProductsQuery } from '../../redux/api'
import { Product } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleSearchBar } from '../../redux/reducers/searchBarSlice'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { LargeHeader } from '../../Components/LargeHeader/LargeHeader'
import { NotFoundScreen } from '../../Components/NotFoundScreen/NotFoundScreen'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.searchBar.value)

  const { data: allProducts } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])

  const handleFilteredProducts = (products: Product[] | undefined) => {
    setFilteredProducts(products)
  }

  const handleShowSearchBar = () => {
    dispatch(toggleSearchBar(true))
  }

  return (
    <Container>
      <LargeHeader
        title="Search results for"
        searchedValue={searchValue}
        filteredProductsResult={handleFilteredProducts}
        otherDetails={<SearchButton onClick={handleShowSearchBar}> Search again </SearchButton>}
        numberOfProducts={filteredProducts?.length}
        products={allProducts}
      />
      <ProductsList>
        {filteredProducts?.length ? (
          filteredProducts?.map((product, index) => (
            <ProductCard
              id={product.id}
              key={index}
              brand={product.brand}
              name={product.name}
              tags={product.tags}
              imageURL={product.imageURL}
              hoverImageURL={product.hoverImageURL}
              rating={product.rating}
              price={product.price}
            />
          ))
        ) : (
          <NotFoundScreen />
        )}
      </ProductsList>
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

const SearchButton = styled.button`
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  text-decoration: underline;
  background: none;
  border: none;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }
`

export default SearchPage
