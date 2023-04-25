import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flip, shift, useFloating } from '@floating-ui/react-dom'
import styled, { css } from 'styled-components'

import { allProductsRoute, homeRoute, logInRoute, searchRoute } from '../../helpers/routes'
import { makeupHeaderItems, skincareHeaderItems } from './utils/constants'
import useBreakpoint from '../../hooks/useBreakpointsHook/useBreakpoint'
import useClickOutSide from '../../hooks/useClickOutSide'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleBagDrawer } from '../../redux/reducers/bagDrawerSlice'
import { changeSearchBarValue, toggleSearchBar } from '../../redux/reducers/searchBarSlice'
import {
  useDecreaseQuantityMutation,
  useDeleteAllProductsFromCartMutation,
  useDeleteProductsFromCartMutation,
  useGetProductsCartQuery,
  useIncreaseQuantityMutation,
} from '../../redux/api'
import { IconButton, IconButtonType } from '../IconButton/IconButton'
import { ExtendedHeader } from '../ExtendedHeader/ExtendedHeader'
import { SectionMenu } from '../ExtendedHeader/SectionMenu/SectionMenu'
import { SectionMenuItem } from '../ExtendedHeader/SectionMenuItem/SectionMenuItem'
import { SearchBar } from '../SearchBar/SearchBar'
import { BagDrawer } from '../BagDrawer/BagDrawer'
import { SmallProductCard } from '../SmallProductCard/SmallProductCard'
import { Badge } from '../Badge/Badge'

import Logo from '../../assets/icons/logo.png'
import Loading from '../Loading/Loading'

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
  const isSearchBarOpen = useAppSelector(state => state.searchBar.isSearchBarOpen)
  const isBagDrawerOpen = useAppSelector(state => state.bagDrawer.isOpenBagDrawer)

  const [activeMenuItem, setActiveMenuItem] = useState(-1)
  const [showSkincareDropDown, setShowSkincareDropDown] = useState(false)
  const [showMakeupDropDown, setShowMakeupDropDown] = useState(false)
  const [searchBarValue, setSearchBarValue] = useState('')

  const {
    data: cartProducts,
    isLoading: cartProductsIsLoading,
    isFetching: cartProductsIsFetching,
  } = useGetProductsCartQuery()
  const [deleteProductsFromCart, { isLoading: deleteProductsFromCartIsLoading }] = useDeleteProductsFromCartMutation()
  const [deleteAllProductsFromCart, { isLoading: deleteAllProductsFromCartIsLoading }] =
    useDeleteAllProductsFromCartMutation()
  const [increaseQuantity] = useIncreaseQuantityMutation()
  const [decreaseQuantity] = useDecreaseQuantityMutation()

  const subTotal = cartProducts?.reduce((sum, product) => {
    sum += product.quantity * product.price

    return sum
  }, 0)

  const numberOfProducts = cartProducts?.reduce((sum, product) => {
    sum += product.quantity

    return sum
  }, 0)

  const clickRef = useRef<HTMLDivElement>(null)

  useClickOutSide(clickRef, () => {
    setShowSkincareDropDown(false)
    setShowMakeupDropDown(false)
    setActiveMenuItem(-1)

    dispatch(toggleSearchBar(false))
    dispatch(toggleBagDrawer(false))

    // when bag drawer is close
    document.body.style.overflow = 'unset'
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

  const increaseProductQuantity = useCallback(
    async (productId: number) => {
      await increaseQuantity({
        id: productId,
      })
    },
    [increaseQuantity]
  )

  const decreaseProductQuantity = useCallback(
    async (productId: number) => {
      await decreaseQuantity({
        id: productId,
      })
    },
    [decreaseQuantity]
  )

  const deleteProductFromCart = useCallback(
    async (productId: number) => {
      await deleteProductsFromCart({
        id: productId,
      })
    },
    [deleteProductsFromCart]
  )

  const clearAll = useCallback(async () => {
    await deleteAllProductsFromCart()
  }, [deleteAllProductsFromCart])

  const handleActiveMenuItem = (menuItemIndex: number, event: any) => {
    const { name } = event.target

    setActiveMenuItem(menuItemIndex)

    if (name === HeaderItemType.SKINCARE) {
      setShowSkincareDropDown(!showSkincareDropDown)
      setShowMakeupDropDown(false)
    }

    if (name === HeaderItemType.MAKE_UP) {
      setShowMakeupDropDown(!showMakeupDropDown)
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
    setShowMakeupDropDown(false)
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(event.target.value.toLowerCase())
  }

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(changeSearchBarValue(searchBarValue))
      navigateTo({
        pathname: searchRoute,
        search: `?q=${searchBarValue}`,
      })

      dispatch(toggleSearchBar(false))
      setSearchBarValue('')
    }
  }

  const handleShowBagDrawer = () => {
    dispatch(toggleBagDrawer(true))
  }

  if (cartProductsIsLoading || cartProductsIsFetching) {
    return <Loading smallSpinner />
  }

  return (
    <>
      <HeaderMainContainer ref={extendedHeaderReference}>
        <LoginContainer>
          <Content> FREE SHIPPING ON ORDERS OVER $50 </Content>
          <LoginButton onClick={() => handleRedirectOnClick(logInRoute)}> LOG IN </LoginButton>
        </LoginContainer>

        <HeaderContainer ref={searchBarReference}>
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
                onClick={() => dispatch(toggleSearchBar(!isSearchBarOpen))}
              />

              <BagContainer>
                <IconButton variant={IconButtonType.BAG} onClick={handleShowBagDrawer} />
                {isDesktop && <Badge> {cartProducts?.length} </Badge>}
              </BagContainer>
              {!isDesktop && <StyledMobileIconButton variant={IconButtonType.MOBILE_BAG} />}
            </ButtonsContainer>
          </InnerHeader>
        </HeaderContainer>
      </HeaderMainContainer>

      {isSearchBarOpen && (
        <RefContainer ref={clickRef}>
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
        skincareHeaderItems.map(({ image, sections }, index) => (
          <RefContainer ref={clickRef} key={index}>
            <ExtendedHeader
              ref={extendedHeaderFloating}
              position={{ position: extendedHeaderStrategy, top: extendedHeaderY ?? '', left: 0 }}
              image={image}
            >
              {sections?.map(({ title, submenu }) => (
                <SectionMenu title={title} key={title}>
                  {submenu.map(submenuItem => (
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
        makeupHeaderItems.map(({ image, sections }, index) => (
          <RefContainer ref={clickRef} key={index}>
            <ExtendedHeader
              key={index}
              ref={extendedHeaderFloating}
              position={{ position: extendedHeaderStrategy, top: extendedHeaderY ?? '', left: 0 }}
              image={image}
            >
              {sections?.map(({ title, submenu }) => (
                <SectionMenu title={title} key={title}>
                  {submenu.map(({ submenuTitle, navigateTo }) => (
                    <SectionMenuItem key={submenuTitle} onRedirect={() => handleRedirectOnClick(navigateTo)}>
                      {submenuTitle}
                    </SectionMenuItem>
                  ))}
                </SectionMenu>
              ))}
            </ExtendedHeader>
          </RefContainer>
        ))}

      <BagDrawer
        ref={clickRef}
        isOpen={isBagDrawerOpen}
        clearAll={clearAll}
        subTotal={subTotal}
        numberOfProducts={numberOfProducts}
        isLoading={deleteAllProductsFromCartIsLoading}
      >
        {cartProducts?.length ? (
          cartProducts?.map(product => (
            <SmallProductCard
              key={product.id}
              imageURL={`${'../../../../../' + product.imageURL}`}
              brand={product.brand}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              deleteProduct={() => deleteProductFromCart(product.id)}
              increaseQuantity={() => increaseProductQuantity(product.id)}
              decreaseQuantity={() => decreaseProductQuantity(product.id)}
              isLoading={deleteProductsFromCartIsLoading}
            />
          ))
        ) : (
          <EmptyBag>
            <Text> Your cart is empty </Text>
          </EmptyBag>
        )}
      </BagDrawer>
    </>
  )
}

const HeaderMainContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;

  z-index: ${props => props.theme.zIndex.header};
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
  padding-bottom: 6px;
  width: 100%;

  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${props => props.theme.colors.beigeLight};
  }
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
  position: relative;

  display: flex;
  align-items: center;
`

const StyledIconButton = styled(IconButton)`
  margin-right: 24px;
`

const StyledMobileIconButton = styled(IconButton)`
  margin-left: 24px;
`

const EmptyBag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`

const Text = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
`

const RefContainer = styled.div``
