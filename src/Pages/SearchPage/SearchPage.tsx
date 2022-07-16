import { useState } from 'react'
import styled from 'styled-components'

import { useGetProductsQuery } from '../../redux/api'
import { ProductType } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleSearchBar } from '../../redux/reducers/searchBarSlice'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { LargeHeader } from '../../Components/LargeHeader/LargeHeader'
import { NotFoundScreen } from '../../Components/NotFoundScreen/NotFoundScreen'
import { ProductsListWrapper } from '../../Components/ProductsListWrapper/ProductsListWrapper'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.searchBar.value)

  const { data: allProducts } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
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
      <ProductsListWrapper>
        {filteredProducts?.length ? (
          filteredProducts?.map(product => (
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
            />
          ))
        ) : (
          <NotFoundScreen />
        )}
      </ProductsListWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
