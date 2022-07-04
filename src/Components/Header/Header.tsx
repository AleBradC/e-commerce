import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flip, shift, useFloating } from '@floating-ui/react-dom'
import styled, { css } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeSearchBarValue, closeSearchBar, openSearchBar } from '../../redux/reducers/searchBarSlice'
import { allProductsRoute, homeRoute, logInRoute, searchRoute } from '../../Helpers/routes'
import { makeupHeaderItems, skincareHeaderItems } from '../../Helpers/variables'
import useBreakpoint from '../../Helpers/useBreakpointsHook/useBreakpoint'
import useClickOutSide from '../../Helpers/useClickOutSide'
import { IconButton, IconButtonType } from '../IconButton/IconButton'
import { ExtendedHeader } from '../ExtendedHeader/ExtendedHeader'
import { SectionMenu } from '../ExtendedHeader/SectionMenu/SectionMenu'
import { SectionMenuItem } from '../ExtendedHeader/SectionMenuItem/SectionMenuItem'
import { SearchBar } from '../SearchBar/SearchBar'

import Logo from '../../assets/icons/logo.png'

enum HeaderItemType {
  SKINCARE = 'SKINCARE',
  MAKE_UP = 'MAKEUP',
  ALL_PRODUCTS = 'ALL PRODUCTS',
}

export const Header = () => {
  const breakPoint = useBreakpoint()
  const isDesktop = breakPoint === 'lg' || breakPoint === 'xl'
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const isSearchBarOpen = useAppSelector(state => state.searchBar.open)

  const [activeMenuItem, setActiveMenuItem] = useState(-1)
  const [showSkincareDropDown, setShowSkincareDropDown] = useState(false)
  const [showMakeupDropDown, setMakeUpDropDown] = useState(false)
  const [searchBarValue, setSearchBarValue] = useState('')

  const parentRef = useRef<HTMLDivElement>(null)

  useClickOutSide(parentRef, () => {
    setShowSkincareDropDown(false)
    setMakeUpDropDown(false)
    setActiveMenuItem(-1)
  })

  const {
    y: extendedHeaderY,
    reference: extendedHeaderReference,
    floating: extendedHeaderFloating,
    strategy: extendedHeaderStrategy,
  } = useFloating({
    placement: 'bottom',
    middleware: [shift(), flip()],
  })

  const {
    y: searchBarY,
    reference: searchBarReference,
    floating: searchBarFloating,
    strategy: searchBarStrategy,
  } = useFloating({
    placement: 'bottom',
    middleware: [shift(), flip()],
  })

  const handleActiveMenuItem = (menuItemIndex: number, event: any) => {
    const { name } = event.target

    setActiveMenuItem(menuItemIndex)

    if (name === HeaderItemType.SKINCARE) {
      setShowSkincareDropDown(!showSkincareDropDown)
      setMakeUpDropDown(false)
    }

    if (name === HeaderItemType.MAKE_UP) {
      setMakeUpDropDown(!showMakeupDropDown)
      setShowSkincareDropDown(false)
    }

    if (name === HeaderItemType.ALL_PRODUCTS) {
      navigateTo(allProductsRoute)
      setActiveMenuItem(-1)
    }
  }

  const handleRedirectOnClick = (route: string) => {
    navigateTo(route)

    setActiveMenuItem(-1)
    setShowSkincareDropDown(false)
    setMakeUpDropDown(false)
  }

  const handleToggleSearchBar = () => {
    if (isSearchBarOpen) {
      dispatch(closeSearchBar())
    } else {
      dispatch(openSearchBar())
    }
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(event.target.value.toLowerCase())
  }

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(changeSearchBarValue(searchBarValue))
      navigateTo(searchRoute)

      dispatch(closeSearchBar())
      setSearchBarValue('')
    }
  }

  return (
    <Main ref={searchBarReference}>
      <HeaderMainContainer ref={extendedHeaderReference}>
        <LoginContainer>
          <Content> FREE SHIPPING ON ORDERS OVER $50 </Content>
          <LoginButton onClick={() => handleRedirectOnClick(logInRoute)}> LOG IN </LoginButton>
        </LoginContainer>

        <HeaderContainer>
          <LogoContainer onClick={() => handleRedirectOnClick(homeRoute)}>
            <ShenLogo src={Logo} alt="logo" />
          </LogoContainer>

          <InnerHeader isTabletOrMobile={!isDesktop}>
            {isDesktop && (
              <HeaderItemContainer>
                {Object.values(HeaderItemType).map((item, index) => (
                  <HeaderItem
                    name={item}
                    key={index}
                    selected={activeMenuItem === index}
                    onClick={() => handleActiveMenuItem(index, event)}
                  >
                    {item}
                  </HeaderItem>
                ))}
              </HeaderItemContainer>
            )}
            <ButtonsContainer>
              <StyledIconButton
                variant={isSearchBarOpen ? IconButtonType.CLOSE : IconButtonType.SEARCH}
                onClick={handleToggleSearchBar}
              />

              <BagContainer>
                <IconButton variant={IconButtonType.BAG} />
                {isDesktop && <Badge> 1 </Badge>}
              </BagContainer>
              {!isDesktop && <StyledMobileIconButton variant={IconButtonType.MOBILE_BAG} />}
            </ButtonsContainer>
          </InnerHeader>
        </HeaderContainer>
      </HeaderMainContainer>

      {isSearchBarOpen && (
        <RefContainer ref={parentRef}>
          <SearchBar
            value={searchBarValue}
            onChange={handleChangeValue}
            onKeyDown={handleSearch}
            ref={searchBarFloating}
            position={{ position: searchBarStrategy, top: searchBarY ?? '', left: 0 }}
          />
        </RefContainer>
      )}
      {showSkincareDropDown &&
        skincareHeaderItems.map((items, index) => (
          <RefContainer key={index} ref={parentRef}>
            <ExtendedHeader
              ref={extendedHeaderFloating}
              position={{ position: extendedHeaderStrategy, top: extendedHeaderY ?? '', left: 0 }}
              image={items.image}
            >
              {items?.sections?.map(section => (
                <SectionMenu title={section.title} key={section.title}>
                  {section.submenu.map(submenuItem => (
                    <SectionMenuItem
                      key={submenuItem.submenuTitle}
                      onRedirect={() => handleRedirectOnClick(submenuItem.navigateTo)}
                    >
                      {submenuItem.submenuTitle}
                    </SectionMenuItem>
                  ))}
                </SectionMenu>
              ))}
            </ExtendedHeader>
          </RefContainer>
        ))}
      {showMakeupDropDown &&
        makeupHeaderItems.map((items, index) => (
          <RefContainer key={index} ref={parentRef}>
            <ExtendedHeader
              ref={extendedHeaderFloating}
              position={{ position: extendedHeaderStrategy, top: extendedHeaderY ?? '', left: 0 }}
              image={items.image}
            >
              {items?.sections?.map(section => (
                <SectionMenu title={section.title} key={section.title}>
                  {section.submenu.map(submenuItem => (
                    <SectionMenuItem
                      key={submenuItem.submenuTitle}
                      onRedirect={() => handleRedirectOnClick(submenuItem.navigateTo)}
                    >
                      {submenuItem.submenuTitle}
                    </SectionMenuItem>
                  ))}
                </SectionMenu>
              ))}
            </ExtendedHeader>
          </RefContainer>
        ))}
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 62px 8px 62px;

  background: ${props => props.theme.colors.brownBadge};
`

const Content = styled.span`
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;

  color: ${props => props.theme.colors.white};
`

const LoginButton = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;

  color: ${props => props.theme.colors.white};
`

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 20px 42px 2px 62px;
  border-bottom: 1px solid ${props => props.theme.colors.beigeLight};

  background: ${props => props.theme.colors.white};
`

const LogoContainer = styled.div`
  margin-right: 62px;
  cursor: pointer;
`

const ShenLogo = styled.img`
  width: 90px;
  height: 50px;
`

const InnerHeader = styled.div<{ isTabletOrMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.isTabletOrMobile ? 'flex-end' : 'space-between')};

  width: 100%;
`

const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
`

const HeaderItem = styled.button<{ selected: boolean }>`
  border: none;
  background: none;

  margin-right: 16px;
  padding: 0 0 6px 0;
  font-weight: bolder;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid ${props => props.theme.colors.white};

  &:hover {
    border-bottom: 1px solid ${props => props.theme.colors.black};
  }

  ${props =>
    props.selected &&
    css`
      border-bottom: 1px solid ${props => props.theme.colors.black};
    `}
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const BagContainer = styled.div`
  display: flex;
  align-items: center;
`

const Badge = styled.span`
  margin-top: 4px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
`

const StyledIconButton = styled(IconButton)`
  margin-right: 24px;
`

const StyledMobileIconButton = styled(IconButton)`
  margin-left: 24px;
`

const RefContainer = styled.div``
