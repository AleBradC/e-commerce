import { Input, InputProps } from '../../Components/Input/Input'
import { useState } from 'react'

const HomePage: React.FC<InputProps> = ({ value, ...inputProps }) => {
  const [controlledValue, setControlledValue] = useState(value)

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setControlledValue(e.target.value)

  return <Input {...inputProps} value={controlledValue} onChange={onChangeValue} />
}

export default HomePage
