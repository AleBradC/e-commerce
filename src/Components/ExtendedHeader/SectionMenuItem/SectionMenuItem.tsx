import {ReactNode} from "react";
import styled from "styled-components";

export interface OptionsMenuItemProps {
    onRedirect: () => void
    children: string
}

export const SectionMenuItem: React.FC<OptionsMenuItemProps> = (props: OptionsMenuItemProps) => {
    const { onRedirect, children } = props

    return (
        <MenuItem onClick={onRedirect}>
            { children }
        </MenuItem>
    )

}

const MenuItem= styled.button`
  background: none;
  border: none;
  cursor: pointer;
  
  padding: 0;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 14px;
  text-align: start;
  font-family: 'Montserrat', sans-serif;
`