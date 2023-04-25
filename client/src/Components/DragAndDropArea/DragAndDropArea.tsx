import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

export interface DragAndDropAreaProps {
  onUpload: (image: File) => void
  image: string
  // type: any -> to do round for user avatar, square for comments
}

export const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({ onUpload, image }) => {
  const handleDrop = useCallback(
    (files: File[]) => {
      if (files[0]) {
        const newImage: File = files[0]
        onUpload(newImage)
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    },
  })

  return (
    <Container {...getRootProps()} isDragAccept={isDragAccept}>
      <input {...getInputProps()} />
      <UploadedImage src={image} alt="image" />
    </Container>
  )
}

const Container = styled.div<{ isDragAccept: boolean }>`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UploadedImage = styled.img`
  object-fit: cover;
`
