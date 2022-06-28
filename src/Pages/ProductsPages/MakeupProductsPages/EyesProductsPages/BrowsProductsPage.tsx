import styled from 'styled-components'

import { useGetProductsQuery } from '../../../../redux/api'
import { LargeHeader } from '../../../../Components/LargeHeader/LargeHeader'
import { ProductCard } from '../../../../Components/ProductCard/ProductCard'
import { useEffect, useState } from 'react'
import { Product } from '../../../../types'

const BrowsProductsPage = () => {
  const { data: allProducts } = useGetProductsQuery()

  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const [selectedSortType, setSelectedSortType] = useState<string | number>('')

  const browsProducts = allProducts?.filter(product => product.category === 'Brows')
  const concerns = [...new Set(browsProducts?.map(product => product.category))]
  const brands = [...new Set(browsProducts?.map(product => product.brand))]

  useEffect(() => {
    browsProducts && setFilteredProducts(browsProducts)
  }, [browsProducts])

  useEffect(() => {
    if (selectedSortType === 'byLowerPrice') {
      const sortByLowerPrice = browsProducts?.slice().sort((a, b) => b.price - a.price)
      setFilteredProducts(sortByLowerPrice)
    } else if (selectedSortType === 'byHigherPrice') {
      const sortByHigherPrice = browsProducts?.slice().sort((a, b) => a.price - b.price)
      setFilteredProducts(sortByHigherPrice)
    } else {
      setFilteredProducts(browsProducts)
    }
  }, [browsProducts, selectedSortType])

  const handleSelectedSortType = (option: string | number) => {
    setSelectedSortType(option)
  }

  return (
    <Container>
      <LargeHeader
        selectedSortType={handleSelectedSortType}
        title="Search results for"
        concerns={concerns}
        brands={brands}
        numberOfItemsFound={filteredProducts?.length}
      />
      <ProductsList>
        {filteredProducts?.map(product => (
          <ProductCard
            key={product.id}
            brand={product.brand}
            name={product.name}
            tags={product.tags}
            imageURL={`${'../../../../../' + product.imageURL}`}
            hoverImageURL={`${'../../../../../' + product.hoverImageURL}`}
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

export default BrowsProductsPage
