import styled from 'styled-components'

export interface OptionsMenuItemProps {
  onRedirect: () => void
  children: string
  className?: string
}

export const SectionMenuItem: React.FC<OptionsMenuItemProps> = ({ onRedirect, children, className }) => {
  return (
    <MenuItem className={className} onClick={onRedirect}>
      {children}
    </MenuItem>
  )
}

const MenuItem = styled.div`
  position: relative;
  padding: 0;
  margin-bottom: 14px;

  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: start;
  cursor: pointer;

  color: ${props => props.theme.colors.black};
  transition: padding 0.25s ease-in-out, color 0.25s ease-in-out;
  pointer-events: all;

  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${props => props.theme.colors.black};
    transition: width 0.25s ease-in-out, color 0.25s ease-in-out;
  }

  &:hover {
    position: relative;
    padding-left: 30px;
    color: ${props => props.theme.colors.greyDark};

    transition: padding 0.25s ease-in-out, color 0.25s ease-in-out;
    pointer-events: all;

    &:before {
      content: "";
      position: absolute;
      top: 10px;
      left: 0;
      width: 20px;
      height: 1px;
      background: ${props => props.theme.colors.black};
      transition: width 0.25s ease-in-out, color 0.25s ease-in-out;
    }
    }
  }
`
