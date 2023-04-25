import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { flip, shift, useFloating } from '@floating-ui/react-dom'
import styled from 'styled-components'

import { ProductType } from '../../helpers/types'
import { options } from './utils/constants'
import useClickOutSide from '../../hooks/useClickOutSide'
import { Menu } from '../Menu/Menu'
import { MenuItem } from '../MenuItem/MenuItem'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'
import { Checkbox } from '../CheckBox/CheckBox'
import { Tag } from '../Tag/Tag'

export interface LargeHeaderProps {
  title: string
  searchedValue?: string
  otherDetails?: ReactNode
  description?: string
  numberOfProducts: number | undefined
  filteredProductsResult: (products: ProductType[] | undefined) => void
  products: ProductType[] | undefined
}

export const LargeHeader: React.FC<LargeHeaderProps> = ({
  title,
  searchedValue,
  description,
  otherDetails,
  numberOfProducts,
  filteredProductsResult,
  products,
}) => {
  const [showFilterByBrandMenu, setShowFilterByBrandMenu] = useState(false)
  const [showFilterByConcernsMenu, setShowFilterByConcernsMenu] = useState(false)
  const [selectedConcernsOrBrandOptions, setSelectedConcernsOrBrandOptions] = useState<string[]>([])
  const [selectedSortOption, setSelectedSortOption] = useState<string | number>('')

  const clickRef = useRef<HTMLDivElement>(null)

  useClickOutSide(clickRef, () => {
    setShowFilterByBrandMenu(false)
    setShowFilterByConcernsMenu(false)
  })

  const brands = [...new Set(products?.map(({ brand }) => brand))]
  const concerns = [...new Set(products?.map(({ tags }) => tags).flat())]

  const {
    x: filterByBrandX,
    y: filterByBrandY,
    reference: filterByBrandReference,
    floating: filterByBrandFloating,
    strategy: filterByBrandStrategy,
  } = useFloating({
    placement: 'bottom-start',
    middleware: [shift(), flip()],
  })

  const {
    x: filterByConcernsX,
    y: filterByConcernsY,
    reference: filterByConcernsReference,
    floating: filterByConcernsFloating,
    strategy: filterByConcernsStrategy,
  } = useFloating({
    placement: 'bottom-start',
    middleware: [shift(), flip()],
  })

  const filteredProducts = useMemo(() => {
    // filter after redirect, if it has search value or not (for other pages)
    const filteredBySearchValue = searchedValue
      ? products?.filter((product: ProductType) => product.name?.toLowerCase().includes(searchedValue as string))
      : products

    // filter by brand / concerns when after check
    if (selectedConcernsOrBrandOptions.length > 0) {
      return selectedConcernsOrBrandOptions
        .map(option =>
          filteredBySearchValue?.filter(product => {
            // products that have one of the options (concern / brand)
            if (product.tags.includes(option) || product.brand.includes(option)) {
              return product
            }
          })
        )
        .flat() as ProductType[]
    } else if (selectedSortOption === 'byLowerPrice') {
      return filteredBySearchValue?.slice().sort((a, b) => a.price - b.price)
    } else if (selectedSortOption === 'byHigherPrice') {
      return filteredBySearchValue?.slice().sort((a, b) => b.price - a.price)
    } else {
      return filteredBySearchValue
    }
  }, [products, searchedValue, selectedConcernsOrBrandOptions, selectedSortOption])

  useEffect(() => {
    filteredProductsResult(filteredProducts)
  })

  const handleChangeCheckedOption = (event: React.ChangeEvent<HTMLInputElement>, selectedItem: string) => {
    if (!selectedConcernsOrBrandOptions.includes(selectedItem)) {
      setSelectedConcernsOrBrandOptions([...selectedConcernsOrBrandOptions, event.target.value])
    } else {
      const newCheckedOptions = selectedConcernsOrBrandOptions.filter(option => option !== selectedItem)
      setSelectedConcernsOrBrandOptions(newCheckedOptions)
    }
  }

  const handleShowFilterByBrandMenu = () => {
    setShowFilterByBrandMenu(!showFilterByBrandMenu)
    setShowFilterByConcernsMenu(false)
  }

  const handleShowFilterByConcernsMenu = () => {
    setShowFilterByConcernsMenu(!showFilterByConcernsMenu)
    setShowFilterByBrandMenu(false)
  }

  const handleClearAll = () => {
    setSelectedConcernsOrBrandOptions([])
  }

  const handleDeleteTag = (tag: string) => {
    const newTagList = selectedConcernsOrBrandOptions.filter(existedTag => existedTag !== tag)
    setSelectedConcernsOrBrandOptions(newTagList)
  }

  return (
    <Container>
      <DetailsContainer>
        <TitleContainer>
          <Title>{title}</Title>
          {otherDetails}
        </TitleContainer>
        {searchedValue ? <SearchedValue> {searchedValue} </SearchedValue> : <Description> {description} </Description>}
      </DetailsContainer>

      {!!filteredProducts?.length && (
        <>
          <FooterBarContainer>
            <FooterBar>
              <FilterContainer ref={clickRef}>
                <FilterCategoryTitle ref={filterByBrandReference} onClick={handleShowFilterByBrandMenu}>
                  BRAND
                </FilterCategoryTitle>
                <Menu
                  showMenu={showFilterByBrandMenu}
                  ref={filterByBrandFloating}
                  position={{ position: filterByBrandStrategy, top: filterByBrandY ?? '', left: filterByBrandX ?? '' }}
                >
                  {brands?.map(brand => (
                    <MenuItem key={brand}>
                      <MenuItemContainer>
                        <Checkbox
                          isChecked={selectedConcernsOrBrandOptions.includes(brand)}
                          onChange={event => handleChangeCheckedOption(event, brand)}
                          value={brand}
                        />
                        {brand}
                      </MenuItemContainer>
                    </MenuItem>
                  ))}
                </Menu>

                <FilterCategoryTitle ref={filterByConcernsReference} onClick={handleShowFilterByConcernsMenu}>
                  CONCERN
                </FilterCategoryTitle>
                <Menu
                  showMenu={showFilterByConcernsMenu}
                  ref={filterByConcernsFloating}
                  position={{
                    position: filterByConcernsStrategy,
                    top: filterByConcernsY ?? '',
                    left: filterByConcernsX ?? '',
                  }}
                >
                  {concerns?.map(concern => (
                    <MenuItem key={concern}>
                      <MenuItemContainer>
                        <Checkbox
                          isChecked={selectedConcernsOrBrandOptions.includes(concern)}
                          onChange={event => handleChangeCheckedOption(event, concern)}
                          value={concern}
                        />
                        {concern}
                      </MenuItemContainer>
                    </MenuItem>
                  ))}
                </Menu>
              </FilterContainer>

              <SortContainer>
                <NumberOfItems> {numberOfProducts} products </NumberOfItems>
                <DropDownMenu
                  options={options}
                  onSelected={setSelectedSortOption}
                  selected={selectedSortOption}
                  placeholder={'Sort by'}
                />
              </SortContainer>
            </FooterBar>
          </FooterBarContainer>

          <TagsContainer>
            {selectedConcernsOrBrandOptions.map(option => (
              <Tag key={option} isFilterTag deleteTag={() => handleDeleteTag(option)}>
                {option}
              </Tag>
            ))}
            {!!selectedConcernsOrBrandOptions.length && (
              <ClearAllButton onClick={handleClearAll}> Clear All </ClearAllButton>
            )}
          </TagsContainer>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-image: linear-gradient(${props => props.theme.colors.white} 10%, rgba(248, 235, 227, 0.8) 100%);
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 102px 64px 42px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 300px;
  width: 100%;
`

const Title = styled.span`
  font-size: 38px;
  line-height: 1.42;
  font-family: 'Optima', sans-serif;
`

const Description = styled.div`
  flex: 1;
  font-size: 38px;
  line-height: 1.42;
  font-family: 'Optima', sans-serif;
`

const SearchedValue = styled.span`
  font-size: 38px;
  line-height: 1.42;
  margin-left: 16px;
  font-family: 'Optima', sans-serif;
  text-transform: uppercase;
  color: ${props => props.theme.colors.greyDarker};
`

const FooterBarContainer = styled.div`
  padding: 20px 60px 20px 64px;
  background-color: ${props => props.theme.colors.white};
`

const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1364px;
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 62px;
`

const FilterCategoryTitle = styled.button`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.black};

  background: none;
  border: none;

  :hover {
    color: ${props => props.theme.colors.brownLight};
  }

  :focus {
    color: ${props => props.theme.colors.brown};
  }
`

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
`

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NumberOfItems = styled.span`
  margin-right: 22px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.colors.grey4};
`

const TagsContainer = styled.div`
  display: flex;
  max-width: 1364px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`

const ClearAllButton = styled.button`
  margin-left: 12px;
  border: none;
  text-decoration: underline;
  background: none;
  color: ${props => props.theme.colors.black};
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
`
