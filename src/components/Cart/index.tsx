import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { useState } from 'react'

import { close, remove, clear } from '../../store/reducers/cart'
import Button from '../Button'
import { formataPreco } from '../../utils/formatters'
import Checkout from '../Pages/Checkout'

import * as S from './styles'

const Cart = () => {
  const { items, isOpen } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()
  const [showCheckout, setShowCheckout] = useState(false)

  const closeCart = () => {
    dispatch(close())
    setShowCheckout(false)
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const getValorTotal = () => {
    return items.reduce((acumulador, item) => {
      return acumulador + item.preco
    }, 0)
  }

  const finalizarCompra = () => {
    dispatch(clear())
    dispatch(close())
    setShowCheckout(false)
    window.location.href = '/'
  }

  return (
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeCart} />
      <S.SideBar>
        <div className="close-button">
          <S.CartCloseButton onClick={closeCart}></S.CartCloseButton>
        </div>

        {!showCheckout ? (
          items.length > 0 ? (
            <>
              <ul>
                {items.map((item) => (
                  <S.CartItem key={item.id}>
                    <button
                      onClick={() => removeItem(item.id)}
                      type="button"
                    ></button>
                    <img src={item.foto} alt={item.nome} />
                    <div>
                      <h3>{item.nome}</h3>
                      <p>{formataPreco(item.preco)}</p>
                    </div>
                  </S.CartItem>
                ))}
              </ul>
              <S.Price>
                <p>Valor total</p>
                <p>{formataPreco(getValorTotal())}</p>
              </S.Price>
              <Button
                type="button"
                title="Clique para continuar com a entrega"
                variant="secondary"
                onClick={() => setShowCheckout(true)}
              >
                Continuar com a entrega
              </Button>
            </>
          ) : (
            <S.EmptyMessage>
              Seu carrinho está vazio. Adicione produtos para continuar.
              <button onClick={closeCart}>Fechar carrinho</button>
            </S.EmptyMessage>
          )
        ) : (
          <Checkout
            onBackToCart={() => setShowCheckout(false)}
            total={getValorTotal()}
            onFinish={finalizarCompra}
          />
        )}
      </S.SideBar>
    </S.CartContainer>
  )
}

export default Cart
