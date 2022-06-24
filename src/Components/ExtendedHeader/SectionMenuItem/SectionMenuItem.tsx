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

const MenuItem = styled.button`
  background: none;
  border: none;

  padding: 0;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 14px;
  text-align: start;
  font-family: 'Montserrat', sans-serif;
`
