import styled from 'styled-components'
import { flip, shift, useFloating } from '@floating-ui/react-dom'

import { Input, InputProps } from '../../Components/Input/Input'
import { useState } from 'react'
import { MenuItem } from '../../Components/MenuItem/MenuItem'
import { Menu } from '../../Components/Menu/Menu'
import { DropDownMenu } from '../../Components/DropDownMenu/DropDownMenu'

const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
]

const HomePage: React.FC<InputProps> = ({ value, ...inputProps }) => {
  const [controlledValue, setControlledValue] = useState(value)
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState<string | number>('')

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setControlledValue(e.target.value)

  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom',
    middleware: [shift(), flip()],
  })

  const handleShowMenu = () => {
    setShowMenu(true)
  }

  return (
    <>
      <Input {...inputProps} value={controlledValue} onChange={onChangeValue} />
      <Button ref={reference} onClick={handleShowMenu}>
        here
      </Button>
      <Menu showMenu={showMenu} ref={floating} position={{ position: strategy, top: y ?? '', left: x ?? '' }}>
        <MenuItem onClick={() => console.log('this is a mock func')}>hello</MenuItem>
      </Menu>

      <DropDownMenu options={options} onSelected={setSelected} selected={selected} placeholder={'Choose one'} />
    </>
  )
}

const Button = styled.div`
  background: blue;
  cursor: pointer;
  width: 40px;
`

export default HomePage
