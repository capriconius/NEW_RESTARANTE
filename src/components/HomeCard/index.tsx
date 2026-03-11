import Estrela from '../../assets/images/estrela.png'
import * as S from './styles'
import Tag from '../Tag'
import Button from '../Button'

type Props = {
  id: number
  title: string
  rating: number
  category: string
  image: string
  description: string
  infos: string[]
}

const RestaurantCard = ({
  id,
  title,
  rating,
  image,
  description,
  infos
}: Props) => (
  <S.CardContainer>
    <S.CardImage src={image} alt={title} />
    <S.TagsContainer>
      {infos.map((info) => (
        <Tag key={info}>{info}</Tag>
      ))}
    </S.TagsContainer>
    <S.CardContent>
      <S.TituloContainer>
        <h3>{title}</h3>
        <div>
          <span>{rating}</span>
          <img src={Estrela} alt="estrela" />
        </div>
      </S.TituloContainer>
      <S.Descricao>{description}</S.Descricao>
      <Button
        asLink
        to={`/perfil/${id}`}
        title="Saiba mais"
        variant="secondary"
      >
        Saiba Mais
      </Button>
    </S.CardContent>
  </S.CardContainer>
)

export default RestaurantCard
