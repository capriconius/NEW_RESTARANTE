import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../Button'
import Card from '../../Card'
import * as S from './styles'
import { formataPreco } from '../../../utils/formatters'
import { usePurchaseMutation } from '../../../services/api'
import InputMask from 'react-input-mask'

type Props = {
  onBackToCart: () => void
  total: number
  onFinish: () => void
}

const Checkout = ({ onBackToCart, total, onFinish }: Props) => {
  const [step, setStep] = useState<'delivery' | 'payment' | 'success'>(
    'delivery'
  )
  const [orderId, setOrderId] = useState<string | null>(null)
  const [purchase, { isLoading, isError }] = usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      city: '',
      cep: '',
      number: '',
      complement: '',
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Campo obrigatório'),
      address: Yup.string().required('Campo obrigatório'),
      city: Yup.string().required('Campo obrigatório'),

      cep: Yup.string()
        .matches(/^[0-9-]+$/, 'Somente números')
        .required('Campo obrigatório'),

      number: Yup.string()
        .matches(/^\d+$/, 'Somente números')
        .required('Campo obrigatório'),

      cardNumber: Yup.string()
        .matches(/^[0-9\s]+$/, 'Somente números')
        .required('Campo obrigatório'),

      cardName: Yup.string().required('Campo obrigatório'),

      expiryMonth: Yup.string()
        .matches(/^\d+$/, 'Somente números')
        .required('Campo obrigatório')
        .test('valid-month', 'Mês inválido', (val) => {
          const num = Number(val)
          return num >= 1 && num <= 12
        }),

      expiryYear: Yup.string()
        .matches(/^\d+$/, 'Somente números')
        .required('Campo obrigatório')
        .test('valid-year', 'Ano inválido', (val) => {
          const num = Number(val)
          return num >= new Date().getFullYear()
        }),

      cvv: Yup.string()
        .matches(/^\d+$/, 'Somente números')
        .required('Campo obrigatório')
    }),

    onSubmit: async (values) => {
      const payload = {
        products: [{ id: 1, price: total }],
        delivery: {
          receiver: values.fullName,
          address: {
            description: values.address,
            city: values.city,
            zipCode: values.cep,
            number: Number(values.number),
            complement: values.complement
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cvv),
            expires: {
              month: Number(values.expiryMonth),
              year: Number(values.expiryYear)
            }
          }
        }
      }

      try {
        const response = await purchase(payload).unwrap()
        setOrderId(response.orderId)
        setStep('success')
      } catch {
        alert('Erro ao finalizar pedido!')
      }
    }
  })

  const validarEntrega = () => {
    const { fullName, address, city, cep, number } = form.values
    if (!fullName || !address || !city || !cep || !number) {
      alert('Preencha todos os campos obrigatórios de entrega!')
      return
    }
    setStep('payment')
  }

  const validarPagamento = () => {
    form.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        alert('Preencha todos os campos obrigatórios de pagamento!')
        return
      }
      form.handleSubmit()
    })
  }

  const CheckoutInputHasError = (fieldName: keyof typeof form.values) => {
    const isTouched = !!form.touched[fieldName]
    const isInvalid = !!form.errors[fieldName]
    return isTouched && isInvalid
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <Card
        title={
          step === 'delivery' ? (
            'Entrega'
          ) : step === 'payment' ? (
            <S.CheckPrice>
              <span>Pagamento - Valor a pagar </span>
              <span>{formataPreco(total)}</span>
            </S.CheckPrice>
          ) : (
            `Pedido realizado - ${orderId}`
          )
        }
      >
        {step === 'delivery' && (
          <>
            <S.InputGroup>
              <label htmlFor="fullName">Quem irá receber</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.values.fullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={CheckoutInputHasError('fullName') ? 'error' : ''}
              />
            </S.InputGroup>

            <S.InputGroup>
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.values.address}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={CheckoutInputHasError('address') ? 'error' : ''}
              />
            </S.InputGroup>

            <S.InputGroup>
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={CheckoutInputHasError('city') ? 'error' : ''}
              />
            </S.InputGroup>

            <S.Row>
              <S.InputGroup>
                <label htmlFor="cep">CEP</label>
                <InputMask
                  mask="99999999"
                  id="cep"
                  name="cep"
                  value={form.values.cep}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={CheckoutInputHasError('cep') ? 'error' : ''}
                />
              </S.InputGroup>

              <S.InputGroup>
                <label htmlFor="number">Número</label>
                <InputMask
                  mask="9999"
                  id="number"
                  name="number"
                  value={form.values.number}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={CheckoutInputHasError('number') ? 'error' : ''}
                />
              </S.InputGroup>
            </S.Row>

            <S.InputGroup>
              <label htmlFor="complement">Complemento (opcional)</label>
              <input
                type="text"
                id="complement"
                name="complement"
                value={form.values.complement}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </S.InputGroup>

            <Button type="button" onClick={validarEntrega} variant="secondary">
              Continuar com o pagamento
            </Button>
            <Button type="button" onClick={onBackToCart} variant="secondary">
              Voltar para o carrinho
            </Button>
          </>
        )}

        {step === 'payment' && (
          <>
            <S.InputGroup>
              <label htmlFor="cardName">Nome do cartão</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={form.values.cardName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={CheckoutInputHasError('cardName') ? 'error' : ''}
              />
            </S.InputGroup>

            <S.Row>
              <S.InputGroup maxWidth="228px">
                <label htmlFor="cardNumber">Número do cartão</label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  id="cardNumber"
                  name="cardNumber"
                  value={form.values.cardNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={CheckoutInputHasError('cardNumber') ? 'error' : ''}
                />
              </S.InputGroup>

              <S.InputGroup maxWidth="87px">
                <label htmlFor="cvv">CVV</label>
                <InputMask
                  mask="999"
                  id="cvv"
                  name="cvv"
                  value={form.values.cvv}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={CheckoutInputHasError('cvv') ? 'error' : ''}
                />
              </S.InputGroup>
            </S.Row>

            <S.Row>
              <S.InputGroup>
                <label htmlFor="expiryMonth">Mês</label>
                <InputMask
                  mask="99"
                  id="expiryMonth"
                  name="expiryMonth"
                  value={form.values.expiryMonth}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={
                    CheckoutInputHasError('expiryMonth') ? 'error' : ''
                  }
                  placeholder="MM"
                />
              </S.InputGroup>

              <S.InputGroup>
                <label htmlFor="expiryYear">Ano</label>
                <InputMask
                  mask="9999"
                  id="expiryYear"
                  name="expiryYear"
                  value={form.values.expiryYear}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={CheckoutInputHasError('expiryYear') ? 'error' : ''}
                  placeholder="AAAA"
                />
              </S.InputGroup>
            </S.Row>

            <Button
              variant="secondary"
              type="button"
              onClick={validarPagamento}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Finalizar pagamento'}
            </Button>

            {isError && <p>❌ Ocorreu um erro ao finalizar o pedido.</p>}

            <Button
              variant="secondary"
              type="button"
              onClick={() => setStep('delivery')}
            >
              Voltar para entrega
            </Button>
          </>
        )}

        {step === 'success' && (
          <>
            <S.Paragraph>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </S.Paragraph>
            <br />
            <S.Paragraph>
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar.
            </S.Paragraph>
            <br />
            <S.Paragraph>
              Esperamos que desfrute de uma deliciosa experiência gastronômica.
              Bom apetite!
            </S.Paragraph>

            <Button type="button" onClick={onFinish} variant="secondary">
              Concluir
            </Button>
          </>
        )}
      </Card>
    </form>
  )
}

export default Checkout
