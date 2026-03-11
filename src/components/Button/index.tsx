import * as S from './styles'

type Props = {
  type?: 'button' | 'submit' | 'reset' // valores válidos para <button>
  title?: string // agora opcional
  to?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  asLink?: boolean // define se é link ou botão
}

const Button = ({
  type = 'button',
  title,
  to,
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  asLink = false
}: Props) => {
  if (!asLink) {
    return (
      <S.ButtonContainer
        type={type}
        title={title}
        onClick={onClick}
        variant={variant}
        disabled={disabled}
      >
        {children}
      </S.ButtonContainer>
    )
  }

  return (
    <S.ButtonLink to={to as string} title={title} variant={variant}>
      {children}
    </S.ButtonLink>
  )
}

export default Button
