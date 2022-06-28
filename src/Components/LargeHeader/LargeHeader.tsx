import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { flip, shift, useFloating } from '@floating-ui/react-dom'
import styled from 'styled-components'

import { options } from '../../Helpers/variables'
import useClickOutSide from '../../Helpers/useClickOutSide'
import { Menu } from '../Menu/Menu'
import { MenuItem } from '../MenuItem/MenuItem'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'
import { Checkbox } from '../CheckBox/CheckBox'
import { Tag } from '../Tag/Tag'

export interface LargeHeaderProps {
  title: string
  searchedValue?: string
  otherDetails?: ReactNode
  numberOfItemsFound: number | undefined
  checkedConcern?: (filteredItems: string[]) => void
  selectedSortType: (selectedType: string | number) => void
  brands: string[] | undefined
  concerns: string[] | undefined
}

export const LargeHeader: React.FC<LargeHeaderProps> = ({
  selectedSortType,
  checkedConcern,
  title,
  searchedValue,
  otherDetails,
  numberOfItemsFound,
  brands,
  concerns,
}) => {
  const [showFilterByBrandMenu, setShowFilterByBrandMenu] = useState(false)
  const [showFilterByType, setShowFilterByType] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | number>('')
  const [checkedOptions, setCheckedOptions] = useState<string[]>([])
  const parentRef = useRef<HTMLDivElement>(null)

  useClickOutSide(parentRef, () => {
    setShowFilterByBrandMenu(false)
    setShowFilterByType(false)
  })

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
    x: filterByTypeX,
    y: filterByTypeY,
    reference: filterByTypeReference,
    floating: filterByTypeFloating,
    strategy: filterByTypeStrategy,
  } = useFloating({
    placement: 'bottom-start',
    middleware: [shift(), flip()],
  })

  useEffect(() => {
    selectedSortType(selectedOption)
    checkedConcern && checkedConcern(checkedOptions)
  }, [checkedOptions, checkedConcern, selectedOption, selectedSortType])

  const handleFilterByBrandMenu = () => {
    setShowFilterByBrandMenu(!showFilterByBrandMenu)
    setShowFilterByType(false)
  }

  const handleFilterByTypeMenu = () => {
    setShowFilterByType(!showFilterByType)
    setShowFilterByBrandMenu(false)
  }

  const handleChangeCheckedOption = (event: React.ChangeEvent<HTMLInputElement>, selectedItem: string) => {
    if (!checkedOptions.includes(selectedItem)) {
      setCheckedOptions([...checkedOptions, event.target.value])
    } else {
      const newCheckedOptions = checkedOptions.filter(option => option !== selectedItem)
      setCheckedOptions(newCheckedOptions)
    }
  }

  const handleClearAll = () => {
    setCheckedOptions([])
  }

  return (
    <Container>
      <DetailsContainer>
        <TitleContainer>
          <Title>{title}</Title>
          {otherDetails}
        </TitleContainer>
        <SearchedValue>{searchedValue}</SearchedValue>
      </DetailsContainer>

      <FooterBar>
        <FilterContainer ref={parentRef}>
          {brands && (
            <>
              <FilterCategoryTitle ref={filterByBrandReference} onClick={handleFilterByBrandMenu}>
                Brand
              </FilterCategoryTitle>
              <Menu
                showMenu={showFilterByBrandMenu}
                ref={filterByBrandFloating}
                position={{ position: filterByBrandStrategy, top: filterByBrandY ?? '', left: filterByBrandX ?? '' }}
              >
                {brands?.map((brand, index) => (
                  <MenuItem key={index}>
                    <MenuItemContainer>
                      {/*<Checkbox*/}
                      {/*  isChecked={checkedOptions.includes(brand)}*/}
                      {/*  onChange={event => handleChangeCheckedOption(event, brand)}*/}
                      {/*  value={brand}*/}
                      {/*/>*/}
                      {brand}
                    </MenuItemContainer>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {concerns && (
            <>
              <FilterCategoryTitle ref={filterByTypeReference} onClick={handleFilterByTypeMenu}>
                CONCERN
              </FilterCategoryTitle>

              <Menu
                showMenu={showFilterByType}
                ref={filterByTypeFloating}
                position={{ position: filterByTypeStrategy, top: filterByTypeY ?? '', left: filterByTypeX ?? '' }}
              >
                {concerns?.map((concern, index) => (
                  <MenuItem key={index}>
                    <MenuItemContainer>
                      <Checkbox
                        isChecked={checkedOptions.includes(concern)}
                        onChange={event => handleChangeCheckedOption(event, concern)}
                        value={concern}
                      />
                      {concern}
                    </MenuItemContainer>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </FilterContainer>

        <SortContainer>
          <NumberOfItems> {numberOfItemsFound} products </NumberOfItems>
          <DropDownMenu
            options={options}
            onSelected={setSelectedOption}
            selected={selectedOption}
            placeholder={'Sort by'}
          />
        </SortContainer>
      </FooterBar>

      <TagsContainer>
        {checkedOptions.map(option => (
          <Tag key={option}> {option} </Tag>
        ))}
        {!!checkedOptions.length && <ClearAllButton onClick={handleClearAll}> Clear All </ClearAllButton>}
      </TagsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const DetailsContainer = styled.div`
  display: flex;
  padding: 102px 64px 42px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.span`
  font-size: 38px;
  font-family: 'Tiro Telugu', serif;
  font-weight: 100;
`

const SearchedValue = styled.span`
  margin-left: 16px;
  font-size: 38px;
  font-family: 'Tiro Telugu', serif;
  font-weight: 100;
  text-transform: uppercase;
  color: ${props => props.theme.colors.greyDarker};
`

const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px 20px 64px;
  background-color: ${props => props.theme.colors.white};
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
  padding: 20px 60px 20px 64px;
`

const ClearAllButton = styled.button`
  border: none;
  text-decoration: underline;
  background: none;
  color: ${props => props.theme.colors.black};
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
`
