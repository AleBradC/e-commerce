import { useGetProductsQuery } from '../../redux/api'

const SearchPage = () => {
  const { data: allProducts } = useGetProductsQuery()

  console.log(allProducts, 'here')

  return <h1> SearchPage </h1>
}

export default SearchPage
