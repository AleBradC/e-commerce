import { useState } from 'react'
import styled from 'styled-components'

import { ProductType } from '../../helpers/types'
import { useGetProductsQuery } from '../../redux/api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleSearchBar } from '../../redux/reducers/searchBarSlice'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { LargeHeader } from '../../components/LargeHeader/LargeHeader'
import { NotFoundScreen } from '../../components/NotFoundScreen/NotFoundScreen'
import { ProductsListWrapper } from '../../components/ProductsListWrapper/ProductsListWrapper'
import Loading from '../../components/Loading/Loading'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.searchBar.value)

  const {
    data: allProducts,
    isLoading: allProductsIsLoading,
    isFetching: allProductsIsFetching,
  } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>([])

  const handleFilteredProducts = (products: ProductType[] | undefined) => {
    setFilteredProducts(products)
  }

  const handleShowSearchBar = () => {
    dispatch(toggleSearchBar(true))
  }

  if (allProductsIsLoading || allProductsIsFetching) {
    return <Loading smallSpinner />
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
              principalBenefits={product.principalBenefits}
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
