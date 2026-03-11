import { PuffLoader } from 'react-spinners'
import { cores } from '../../styles'
import { Container } from './styles'

const Loader = () => (
  <Container>
    <PuffLoader color={cores.azul} />
  </Container>
)

export default Loader
