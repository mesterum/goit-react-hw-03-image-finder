import PropTypes from "prop-types";
import styled from "styled-components";
import ImageGalleryItem from "./ImageGalleryItem";
import { Image } from "./App";
import React from "react";

type Props = { images: Image[] }
const StyledUl = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(
    auto-fill,
    minmax(320px, 1fr)
  );
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`
let lastKey = 0, deltaKey = 0;
function ImageGallery({ images }: Props) {
  if (images.length <= 12) deltaKey = lastKey;
  lastKey = deltaKey + images.length;
  return (
    <StyledUl>
      {images.map((image, index) => (
        <ImageGalleryItem key={deltaKey + index} image={image} />
      ))}
    </StyledUl>
  )
}
const ImageGalleryM = React.memo(ImageGallery)
export default ImageGalleryM;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};