import { useEffect, useState } from 'react'
import RestaurantList from '../../HomeList'
import Hero from '../../Hero'
import { useGetRestaurantsQuery } from '../../../services/api'
import Loader from '../../../components/Loader'
import Footer from '../../Footer'

const Home = () => {
  const {
    data: restaurantes,
    isLoading,
    isFetching,
    isError
  } = useGetRestaurantsQuery()
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
    return <p>❌ Ocorreu um erro ao carregar os restaurantes.</p>
  }

  if (!restaurantes) {
    return <p>❌ Nenhum restaurante encontrado.</p>
  }

  return (
    <>
      <Hero />
      <RestaurantList restaurants={restaurantes} />
      <Footer />
    </>
  )
}

export default Home
