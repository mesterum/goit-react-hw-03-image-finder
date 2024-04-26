/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useRef } from "react";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Loader from "../Loader";
import Button from "../Button";
import Modal, { ModalCtx } from "../Modal";
import styled from 'styled-components';
import { Images } from "./Images";

const ModalProvider = ModalCtx.Context.Provider
const Center = styled.div`
  display: flex;
  justify-content: center;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`
export default function App() {
  const images = useMemo(() => new Images(), []);
  const modal = useMemo(() => new ModalCtx(), []);
  const state = images.useStore()
  const prevLoadingState = useRef("done");

  useEffect(() => {
    if (prevLoadingState.current === "loading")
      window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
    prevLoadingState.current = images.state.loadingState
  }, [images.state.loadingState]);

  return (
    <ModalProvider value={modal}>
      <Grid>
        <Searchbar onSubmit={images.setQuery} />
        <ImageGallery images={state.images} />
        <Center>
          <Loader visible={state.loadingState === "loading"} />
          <Button visible={state.loadingState === "more"} nextPage={images.nextPage} />
        </Center>
      </Grid>
      <Modal />
    </ModalProvider>
  )
}

