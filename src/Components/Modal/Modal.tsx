import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

export interface ModalProps {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  showModal: boolean
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  return <Container></Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
