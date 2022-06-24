import { ReactNode, useRef, useState } from 'react'
import { flip, shift, useFloating } from '@floating-ui/react-dom'
import styled from 'styled-components'

import { brands, options, types } from '../../Helpers/variables'
import { Menu } from '../Menu/Menu'
import { MenuItem } from '../MenuItem/MenuItem'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'
import useClickOutSide from '../../Helpers/useClickOutSide'

export interface LargeHeaderProps {
  title: string
  description: string
  otherDetails?: ReactNode
  numberOfItems: number
}

export const LargeHeader: React.FC<LargeHeaderProps> = ({ title, description, otherDetails, numberOfItems }) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const [selectedOption, setSelectedOption] = useState<string | number>('')
  const [filterByBrandMenu, setFilterByBrandMenu] = useState(false)
  const [filterByType, setFilterByType] = useState(false)

  const {
    x: filterByBrandX,
    y: filterByBrandY,
    reference: filterByBrandReference,
    floating: filterByBrandFloating,
    strategy: filterByBrandStrategy,
  } = useFloating({
    placement: 'bottom',
    middleware: [shift(), flip()],
  })

  const {
    x: filterByTypeX,
    y: filterByTypeY,
    reference: filterByTypeReference,
    floating: filterByTypeFloating,
    strategy: filterByTypeStrategy,
  } = useFloating({
    placement: 'bottom',
    middleware: [shift(), flip()],
  })

  useClickOutSide(parentRef, () => {
    setFilterByBrandMenu(false)
    setFilterByType(false)
  })

  const handleFilterByBrandMenu = () => {
    setFilterByBrandMenu(!filterByBrandMenu)
    setFilterByType(false)
  }

  const handleFilterByTypeMenu = () => {
    setFilterByType(!filterByType)
    setFilterByBrandMenu(false)
  }

  return (
    <Container>
      <DetailsContainer>
        <TitleContainer>
          <Title>{title}</Title>
          {otherDetails}
        </TitleContainer>
        <Description>{description}</Description>
      </DetailsContainer>

      <FooterBar>
        <FilterContainer ref={parentRef}>
          <FilterItem ref={filterByBrandReference} onClick={handleFilterByBrandMenu}>
            Brand
          </FilterItem>
          <Menu
            showMenu={filterByBrandMenu}
            ref={filterByBrandFloating}
            position={{ position: filterByBrandStrategy, top: filterByBrandY ?? '', left: filterByBrandX ?? '' }}
          >
            {brands.map((brand, index) => (
              <MenuItem key={index} onClick={() => setFilterByBrandMenu(false)}>
                {brand}
              </MenuItem>
            ))}
          </Menu>

          <FilterItem ref={filterByTypeReference} onClick={handleFilterByTypeMenu}>
            Type
          </FilterItem>
          <Menu
            showMenu={filterByType}
            ref={filterByTypeFloating}
            position={{ position: filterByTypeStrategy, top: filterByTypeY ?? '', left: filterByTypeX ?? '' }}
          >
            {types.map((type, index) => (
              <MenuItem key={index} onClick={() => setFilterByType(false)}>
                {type}
              </MenuItem>
            ))}
          </Menu>
        </FilterContainer>

        <SortContainer>
          <NumberOfItems> {numberOfItems} products </NumberOfItems>
          <DropDownMenu
            options={options}
            onSelected={setSelectedOption}
            selected={selectedOption}
            placeholder={'Sort by'}
          />
        </SortContainer>
      </FooterBar>

      <div> after check add tags + delete </div>
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

const Description = styled.span`
  margin-left: 16px;
  font-size: 38px;
  font-family: 'Tiro Telugu', serif;
  font-weight: 100;
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
`

const FilterItem = styled.button`
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

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NumberOfItems = styled.span`
  margin-right: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.colors.grey4};
`
