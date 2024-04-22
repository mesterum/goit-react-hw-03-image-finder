/* eslint-disable react-refresh/only-export-components */
// import './App.css'
import { Component } from "react";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Loader from "../Loader";
import Button from "../Button";
import Modal, { ModalCtx } from "../Modal";
import { getPhotos } from '../../pixabayAPI';
import styled from 'styled-components';


export type Image = {
  id: number;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
};
type Props = Record<string, never>;
type State = {
  loadingState: "loading" | "done" | "more",
  query: string,
  imageModal: Image | null,
  images: Image[],
  page: number,
};
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
export default class App extends Component<Props, State> {
  // static defaultProps = {};
  // static propTypes = {};

  state: State = {
    loadingState: "done",
    query: '',
    imageModal: null,
    images: [],
    page: 1,
  }

  setQuery = async (query: string) => {
    this.setState({ query, page: 1 });
    if (query !== '') {
      this.setState({ loadingState: "loading" });
      const { hits, total } = await getPhotos(query);
      this.setState({
        images: hits,
        loadingState: hits.length === 0 || total <= 12 ? "done" : "more"
      });
      return;
    }
    this.setState({ images: [], loadingState: "done" });
  }
  nextPage = async () => {
    const page = this.state.page + 1;
    this.setState({ loadingState: "loading", page });
    const { hits, total } = await getPhotos(this.state.query, page);
    this.setState({
      images: [...this.state.images, ...hits],
      loadingState: hits.length === 0 || total <= 12 * page ? "done" : "more"
    });
  }
  setModal = (imageModal: Image | null) => this.setState({ imageModal })
  render() {
    return (
      <ModalCtx.Provider value={{
        image: this.state.imageModal,
        setModal: this.setModal
      }}>
        <Grid>
          <Searchbar onSubmit={this.setQuery} />
          <ImageGallery images={this.state.images} />
          <Center>
            <Loader visible={this.state.loadingState === "loading"} />
            <Button visible={this.state.loadingState === "more"} nextPage={this.nextPage} />
          </Center>
        </Grid>
        <Modal />
      </ModalCtx.Provider>
    )
  }
  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.loadingState === "loading")
      window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
  }

}

