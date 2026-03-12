import styled from 'styled-components'
import { breackpoints, cores } from '../styles'

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: none;

  &.visivel {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
`

export const ModalContainer = styled.div`
  position: relative;
  z-index: 3;
  width: 90%;
  max-width: 1024px;

  > img {
    width: 16px !important;
    height: 16px !important;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    z-index: 3;
  }
`

export const ModalContent = styled.div`
  background-color: ${cores.salmao};
  padding: 32px;
  color: ${cores.corDeFundo};
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1024px;

  @media (max-width: ${breackpoints.tablet}) {
    flex-direction: column;
    padding: 16px;
    max-height: 80vh;
    overflow-y: auto;
    width: 100%;
  }

  @media (max-width: ${breackpoints.mobile}) {
    padding: 12px;
  }

  img {
    width: 280px;
    height: 280px;
    object-fit: cover;
    margin-right: 24px;

    @media (max-width: ${breackpoints.tablet}) {
      width: 100%;
      height: 200px;
      margin-right: 0;
      margin-bottom: 16px;
    }

    @media (max-width: ${breackpoints.mobile}) {
      height: 150px;
    }
  }

  h4 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;

    @media (max-width: ${breackpoints.mobile}) {
      font-size: 16px;
    }
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;

    @media (max-width: ${breackpoints.mobile}) {
      font-size: 12px;
      line-height: 18px;
    }
  }
`
export const BotaoModal = styled.button`
  background-color: ${cores.corDeFundo};
  color: ${cores.salmao};
  border: none;
  padding: 6px 4px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  width: 100%; /* ocupa toda a largura */
  max-width: 218px; /* limita a largura máxima */

  @media (max-width: ${breackpoints.tablet}) {
    width: 100%;
    padding: 12px;
  }

  @media (max-width: ${breackpoints.mobile}) {
    font-size: 12px;
    padding: 10px;
  }
`
export const ModalFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: ${breackpoints.tablet}) {
    width: 100%;
  }
`
