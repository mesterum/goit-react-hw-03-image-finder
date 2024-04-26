/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import { Image } from "./App/Images";
import { createContext, useEffect, useContext, useState, useCallback } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;

& .modal {
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
}`

export class ModalCtx {
  setModal(image: Image | null): void { image }
  useModal(): Image | null {
    const [image, setModal] = useState<Image | null>(null);
    useEffect(() => { this.setModal = setModal }, [setModal]);
    return image
  }
  static Context = createContext<ModalCtx>(new ModalCtx())
}

export default function Modal() {
  const Modal = useContext(ModalCtx.Context);
  const image = Modal.useModal();
  const close = useCallback(() => Modal.setModal(null), [Modal]);
  useEffect(() => {
    const onKeyDown = ((event: KeyboardEvent) => {
      if (event.code === 'Escape') close()
    })
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  if (image) return (
    <Overlay onClick={close}
      onKeyDown={(event) => event.code === 'Escape' ? close() : null} >
      <div className="modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </Overlay>
  )
}
