import './App.css'
import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
// import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";


type Image = {
  id: number;
  // pageURL?: string;
  // type?: string;
  // tags?: string;
  webformatURL: string;
  webformatWidth?: number;
  webformatHeight?: number;
  largeImageURL: string;
  // imageWidth?: number;
  // imageHeight?: number;
  // imageSize?: number;
};
type ImageHit = {
  total: number;
  totalHits: number;
  hits: Image[];
}
type Props = Record<string, never>;
type State = {
  isLoading: boolean,
  query: string,
  isModalOpen: boolean,
  images: Image[],
  page: number,
};

export default class App extends Component<Props, State> {
  // static defaultProps = {};
  // static propTypes = {};

  state = {
    isLoading: false,
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

  render() {
    return (
      <div>

        <Searchbar />
        <ImageGallery />
        <Loader />
        <Button />
        <Modal />

      </div>
    )
  }
  async componentDidMount() {
  }

}

