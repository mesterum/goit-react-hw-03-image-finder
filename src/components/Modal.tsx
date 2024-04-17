import styled from "styled-components";
import { Image } from "./App";
import { createContext, useEffect, useContext } from "react";

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

export type ModalCtx = {
  image: Image | null;
  setModal: (image: Image | null) => void;
}
export const ModalCtx = createContext<ModalCtx>({
  image: null,
  setModal: () => { },
})

export default function Modal() {
  const { image, setModal } = useContext(ModalCtx);
  const close = () => setModal(null);
  useEffect(() => {
    const onKeyDown = ((event: KeyboardEvent) => {
      if (event.code === 'Escape') close()
    })
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (image) return (
    <Overlay onClick={close}
      onKeyDown={(event) => event.code === 'Escape' ? close() : null} >
      <div className="modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </Overlay>
  )
}
