import { PuffLoader } from 'react-spinners'
import { cores } from '../../styles'
import { Container } from './styles'

const Loader = () => (
  <Container>
    <PuffLoader size={400} color={cores.azul} />
  </Container>
)

export default Loader
