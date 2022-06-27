import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Product } from '../../types'
import { useGetProductsQuery } from '../../redux/api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { openSearchBar } from '../../redux/reducers/searchBarSlice'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { LargeHeader } from '../../Components/LargeHeader/LargeHeader'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.searchBar.value)
  const { data: allProducts } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const [selectedSortType, setSelectedSortType] = useState<string | number>('')

  const brands = [...new Set(allProducts?.map(product => product.brand))]
  const concerns = [...new Set(allProducts?.map(product => product.tags).flat())]

  useEffect(() => {
    allProducts && setFilteredProducts(allProducts)
  }, [allProducts])

  useEffect(() => {
    const products = allProducts?.filter((product: Product) => product.name?.toLowerCase().includes(searchValue))

    if (selectedSortType === 'byLowerPrice' || selectedSortType === 'byHigherPrice') {
      products?.sort((a, b) => {
        const difference = a.price - b.price
        if (difference === 0) return 0

        const sign = Math.abs(difference) / difference
        return selectedSortType === 'byLowerPrice' ? -sign : sign
      })
    }

    setFilteredProducts(products)
  }, [allProducts, dispatch, searchValue, selectedSortType])

  const handleShowSearchBar = () => {
    dispatch(openSearchBar())
  }

  const handleSelectedSortType = (option: string | number) => {
    setSelectedSortType(option)
  }

  return (
    <Container>
      <LargeHeader
        title="Search results for -"
        numberOfItemsFound={filteredProducts?.length}
        selectedSortType={handleSelectedSortType}
        brands={brands}
        concerns={concerns}
        searchedValue={searchValue}
        otherDetails={<SearchButton onClick={handleShowSearchBar}> Search again </SearchButton>}
      />
      <ProductsList>
        {filteredProducts?.map((product, index) => (
          <ProductCard
            key={index}
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
