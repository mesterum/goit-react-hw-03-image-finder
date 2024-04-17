import './App.css'
import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";
import { getPhotos } from '../pixabayAPI';
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
  isModalOpen: boolean,
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
    isModalOpen: false,
    images: [],
    page: 1,
  }
  /* res = {
    "total": 4692,
    "totalHits": 500,
    "hits": [
      {
        "id": 195893,
        "pageURL": "https://pixabay.com/en/blossom-bloom-flower-195893/",
        "type": "photo",
        "tags": "blossom, bloom, flower",
        "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 360,
        "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
        "imageWidth": 4000,
        "imageHeight": 2250,
        "imageSize": 4731420,
      }
    ]
  } */
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
  render() {
    return (
      <Grid>
        <Searchbar onSubmit={this.setQuery} />
        <ImageGallery images={this.state.images} />
        <Center>
          <Loader visible={this.state.loadingState === "loading"} />
          <Button visible={this.state.loadingState === "more"} nextPage={this.nextPage} />
        </Center>
        {/* <Modal /> */}
      </Grid>
    )
  }
  async componentDidMount() {
  }
  componentDidUpdate() {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
  }

}

