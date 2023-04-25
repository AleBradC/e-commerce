import { useRef, useState } from 'react'
import styled from 'styled-components'

import { DragAndDropArea } from '../DragAndDropArea/DragAndDropArea'

export interface UserAvatarProps {
  onChange: (image: File) => void
  initialImg: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ onChange, initialImg }) => {
  const [imageURLs, setImageURLs] = useState(initialImg)

  const inputRef = useRef<HTMLInputElement>(null)

  const onUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedImage: File = e.target.files[0]
      const imageURL = URL.createObjectURL(uploadedImage)
      setImageURLs(imageURL)
      onChange(uploadedImage)
    }
  }

  const onDragAndDropImage = (newImage: File) => {
    const newImageURL = URL.createObjectURL(newImage)
    setImageURLs(newImageURL)
    onChange(newImage)
  }

  const handleClick = () => {
    inputRef?.current?.click()
  }

  return (
    <Container>
      <DragAndDropArea onUpload={onDragAndDropImage} image={imageURLs} />
      <Input type="file" ref={inputRef} multiple accept="image/png, image/jpeg, image/gif" onChange={onUploadImages} />
      <button onChange={handleClick}> Upload image </button>
    </Container>
  )
}

const Container = styled.div``

const Input = styled.input`
  display: block;
`
