import { ReactNode } from 'react'
import { Title } from './styles'

type Props = {
  children: ReactNode
  title: ReactNode // <-- agora aceita string ou JSX
}

const Card = ({ children, title }: Props) => (
  <>
    <Title>{title}</Title>
    {children}
  </>
)

export default Card
