import { useState, useRef } from "react";
import styled, { css } from 'styled-components'
import { useNavigate } from "react-router-dom";
import { flip, shift, useFloating} from "@floating-ui/react-dom";

import {
    allProductsRoute, categoryCleansersRoute, categoryMoisturizersRoute, eyesBrowsRoute, eyesMascaraRoute,
    homeRoute, lipsLipGlossesRoute, lipsLipSticksRoute,
    logInRoute, treatmentsFaceOilsRoute, treatmentsFaceSerumsRoute
} from '../../Helpers/routes'
import useBreakpoint from '../../Helpers/useBreakpointsHook/useBreakpoint';
import { IconButton, IconButtonType } from "../IconButton/IconButton";
import { ExtendedHeader, MenuImageType } from "../ExtendedHeader/ExtendedHeader";
import { SectionMenu } from "../ExtendedHeader/SectionMenu/SectionMenu";
import { SectionMenuItem } from "../ExtendedHeader/SectionMenuItem/SectionMenuItem";

import Logo from '../../assets/icons/logo.png'
import useClickOutSide from "../../Helpers/useClickOutSide";
import {SearchBar} from "../SearchBar/SearchBar";

enum HeaderItemType {
    SKINCARE = 'SKINCARE',
    MAKE_UP = 'MAKEUP',
}

const skincareHeaderItems = [{
        image: MenuImageType.SKINCARE,
        sections: [
            {
                title: 'BY CATEGORY',
                submenu: [
                    {
                        submenuTitle: "Cleansers",
                        navigateTo: categoryCleansersRoute
                    },
                    {
                        submenuTitle: "Moisturizers",
                        navigateTo: categoryMoisturizersRoute
                    },
                ]
            },
            {
                title: 'TREATMENTS',
                submenu: [
                    {
                        submenuTitle: "Face Serums",
                        navigateTo: treatmentsFaceSerumsRoute
                    },
                    {
                        submenuTitle: "Face Oils",
                        navigateTo: treatmentsFaceOilsRoute
                    },
                ]
            }
        ],
    }]

const makeupHeaderItems = [{
        image: MenuImageType.MAKE_UP,
        sections: [
            {
                title: 'EYES',
                submenu: [
                    {
                        submenuTitle: "Mascara",
                        navigateTo: eyesMascaraRoute
                    },
                    {
                        submenuTitle: "Brows",
                        navigateTo: eyesBrowsRoute
                    },
                ]
            },
            {
                title: 'LIPS',
                submenu: [
                    {
                        submenuTitle: "Lipstick",
                        navigateTo: lipsLipSticksRoute
                    },
                    {
                        submenuTitle: "Lip Glosses & Tints",
                        navigateTo: lipsLipGlossesRoute
                    },
                ]
            }
        ],
}]

export const Header = () => {
    const breakPoint = useBreakpoint()
    const isDesktop = breakPoint === 'lg' || breakPoint === 'xl'
    const navigateTo = useNavigate()
    const {x, y, reference, floating, strategy } = useFloating(({
        placement: 'bottom',
        middleware: [shift(), flip()]
    }))
    const parentRef = useRef<HTMLDivElement>(null);

    const [activeMenuItem, setActiveMenuItem] = useState(-1)
    const [showSkincareDropDown, setShowSkincareDropDown] = useState(false)
    const [showMakeupDropDown, setMakeUpDropDown] = useState(false)
    const [showSearchBar, setShowSearchBar] = useState(false)

    useClickOutSide(parentRef, () => {
        setShowSkincareDropDown(false)
        setMakeUpDropDown(false)
        setShowSearchBar(false)
        setActiveMenuItem(-1)
    })

    const handleActiveMenuItem = (menuItemIndex: number, event: any ) => {
        const {name} = event.target

        setActiveMenuItem(menuItemIndex)

        if (name === 'SKINCARE') {
            setShowSkincareDropDown(!showSkincareDropDown)
            setMakeUpDropDown(false)
        }

        if (name === 'MAKEUP') {
            setMakeUpDropDown(!showMakeupDropDown)
            setShowSkincareDropDown(false)
        }

    }

    const onRedirect = (route: string) => {
        navigateTo(route)

        setActiveMenuItem(-1)
        setShowSkincareDropDown(false)
        setMakeUpDropDown(false)
    }

    return (
        <Main ref={reference}>
            <HeaderMainContainer>
                <LoginContainer>
                    <Content> FREE SHIPPING ON ORDERS OVER $50 </Content>
                    <LoginButton onClick={() => onRedirect(logInRoute)}> LOG IN </LoginButton>
                </LoginContainer>

                <HeaderContainer>
                    <LogoContainer onClick={() => onRedirect(homeRoute)}>
                        <ShenLogo src={Logo} alt='logo' />
                    </LogoContainer>

                    <InnerHeader isTabletOrMobile={!isDesktop}>
                        { isDesktop &&
                            <HeaderItemContainer>
                                { Object.values(HeaderItemType).map((item, index) =>
                                    <HeaderItem
                                        name={item}
                                        key={index}
                                        selected={activeMenuItem === index}
                                        onClick={() => handleActiveMenuItem(index, event)}
                                    >
                                        {item}
                                    </HeaderItem>)
                                }
                            </HeaderItemContainer>
                        }
                        <ButtonsContainer>
                            <StyledIconButton variant={IconButtonType.SEARCH} onClick={() => setShowSearchBar(!showSearchBar)}/>
                            <BagContainer>
                                <IconButton variant={IconButtonType.BAG} />
                                { isDesktop && <Badge> 1 </Badge> }
                            </BagContainer>
                            { !isDesktop && <StyledMobileIconButton variant={IconButtonType.MOBILE_BAG} /> }
                        </ButtonsContainer>
                    </InnerHeader>
                </HeaderContainer>
            </HeaderMainContainer>
            <SearchBar ref={parentRef} showSearchBar={showSearchBar} />

            {showSkincareDropDown && skincareHeaderItems.map((items, index) => (
                <div key={index} ref={parentRef}>
                    <ExtendedHeader ref={floating} position={{position: strategy, top: y ?? '', left: 0}} image={items.image}>
                        {
                            items?.sections?.map((section) => (
                                <SectionMenu title={section.title} key={section.title}>
                                    {
                                        section.submenu.map(submenuItem => (
                                            <SectionMenuItem key={submenuItem.submenuTitle} onRedirect={() => onRedirect(submenuItem.navigateTo)}>
                                                {submenuItem.submenuTitle}
                                            </SectionMenuItem>
                                        ))
                                    }
                                </SectionMenu>
                            ))
                        }
                    </ExtendedHeader>
                </div>
                ))
            }
            {showMakeupDropDown && makeupHeaderItems.map((items, index) => (
                <div key={index} ref={parentRef}>
                    <ExtendedHeader ref={floating} position={{position: strategy, top: y ?? '', left: 0}} image={items.image}>
                        {
                            items?.sections?.map((section) => (
                                <SectionMenu title={section.title} key={section.title}>
                                    {
                                        section.submenu.map(submenuItem => (
                                            <SectionMenuItem key={submenuItem.submenuTitle} onRedirect={() => onRedirect(submenuItem.navigateTo)}>
                                                {submenuItem.submenuTitle}
                                            </SectionMenuItem>
                                        ))
                                    }
                                </SectionMenu>
                            ))
                        }
                    </ExtendedHeader>
                </div>
            ))
            }
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
      cursor: pointer;
      
      color: ${props => props.theme.colors.white};
`

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 20px 42px 20px 62px;
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

const InnerHeader = styled.div<{isTabletOrMobile: boolean}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isTabletOrMobile ? 'flex-end' : 'space-between'};
  
  width: 100%;
`

const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
`

const HeaderItem = styled.button<{selected: boolean}>`
  border: none;
  background: none;
  cursor: pointer;
  
  margin-right: 16px;
  padding: 0 0 6px 0;
  font-weight: bold;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid ${props => props.theme.colors.white};
  
  &:hover {
    border-bottom: 1px solid ${props => props.theme.colors.black};
  }
  
  ${props => props.selected && css`
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
