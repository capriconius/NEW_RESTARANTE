import * as S from './styles'

type Props = {
  nome: string
  foto: string
  descricao: string
  onOpen: () => void
}

const PerfilCard = ({ nome, foto, descricao, onOpen }: Props) => (
  <S.Card>
    <S.Foto src={foto} alt={nome} />
    <S.Titulo>{nome}</S.Titulo>
    <S.Descricao>{descricao}</S.Descricao>
    <S.BotaoAdicionar onClick={onOpen}>Saiba mais</S.BotaoAdicionar>
  </S.Card>
)

export default PerfilCard
