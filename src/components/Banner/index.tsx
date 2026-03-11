import * as S from './styles'

type Props = {
  nome: string
  categoria: string
  capa: string
}

const BannerPerfil = ({ nome, categoria, capa }: Props) => {
  return (
    <S.Imagem foto={capa}>
      <div className="container">
        <S.Categoria>{categoria}</S.Categoria>
        <S.TituloBanner>{nome}</S.TituloBanner>
      </div>
    </S.Imagem>
  )
}
export default BannerPerfil
