import logo from '../../assets/images/logo.png'
import * as S from './styles'
import instagram from '../../assets/images/instagram.png'
import facebook from '../../assets/images/facebook.png'
import twitter from '../../assets/images/twitter.png'

const Footer = () => (
  <S.FooterContainer>
    <S.Centralizador className="container">
      <S.Logo src={logo} alt="logo" />
      <S.SocialLinks>
        <li>
          <a href="#">
            <img src={instagram} alt="instagram-logo" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={facebook} alt="facebook-logo" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={twitter} alt="twitter-logo" />
          </a>
        </li>
      </S.SocialLinks>
      <S.Copyright>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.{' '}
      </S.Copyright>
    </S.Centralizador>
  </S.FooterContainer>
)

export default Footer
