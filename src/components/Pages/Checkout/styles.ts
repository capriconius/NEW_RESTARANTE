import styled from 'styled-components'
import { cores } from '../../../styles'

type InputGroupProps = {
  maxWidth?: string
}

export const Row = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  gap: 31px;
`

export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;
  max-width: ${(props) => props.maxWidth || 'auto'};

  label {
    color: ${cores.salmaoClaro};
    font-weight: bold;
  }

  input {
    height: 32px;
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    text-align: center;

    &.error {
      border: solid 1px ${cores.vermelho};
    }
  }
`

export const CheckPrice = styled.div`
  display: flex;
  margin-top: 16px;
  font-weight: bold;
  font-size: 16px;

  span:first-child {
    margin-right: 8px;
  }
`

export const Paragraph = styled.p`
  color: ${cores.salmaoClaro};
`

export const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 8px;
`
