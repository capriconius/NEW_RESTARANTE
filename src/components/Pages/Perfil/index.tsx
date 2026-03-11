import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Banner from '../../Banner'
import PerfilHerder from '../../PerfilHerder'
import ProductList from '../../PerfilList'
import { useGetPratosQuery } from '../../../services/api'
import Loader from '../../../components/Loader'
import Footer from '../../Footer'

const Perfil = () => {
  const { id } = useParams()
  const {
    data: restaurante,
    isLoading,
    isFetching,
    isError
  } = useGetPratosQuery(id || '')

  // controla splash screen inicial
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // força a tela de animação aparecer por 1,5 segundos
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // splash screen antes de abrir a página
  if (showSplash) {
    return <Loader />
  }

  // loader enquanto busca dados da API
  if (isLoading || isFetching) {
    return <Loader />
  }

  if (isError) {
    return <p>❌ Ocorreu um erro ao carregar o restaurante.</p>
  }

  if (!restaurante) {
    return <p>❌ Restaurante não encontrado</p>
  }

  return (
    <>
      <PerfilHerder />
      <Banner
        capa={restaurante.capa}
        categoria={restaurante.tipo}
        nome={restaurante.titulo}
      />
      <ProductList pratos={restaurante.cardapio} />
      <Footer />
    </>
  )
}

export default Perfil
