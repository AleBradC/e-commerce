import { ReactNode } from "react";
import styled from "styled-components";

export interface OptionsMenuContainerProps {
    title?: string
    children: ReactNode
}

export const SectionMenu: React.FC<OptionsMenuContainerProps> = (props: OptionsMenuContainerProps) => {
    const { title, children } = props

    return (
        <Container>
            <Title> { title } </Title>
            <MenuItemsContainer>
                { children }
            </MenuItemsContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 42px;
  
    background: ${props => props.theme.colors.white};
`

const Title = styled.span`
    padding: 0;
    margin-bottom: 20px;
    text-align: start;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    color: ${props => props.theme.colors.greyDarker};
`

const MenuItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
`