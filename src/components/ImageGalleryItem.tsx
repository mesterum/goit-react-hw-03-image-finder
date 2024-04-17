import PropTypes from "prop-types";
import { Image } from "./App";
import styled from "styled-components";
import { ModalCtx } from "./Modal";
import { useContext } from "react";

type Props = { image: Image }
const Styled = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);

& img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

& img:hover {
  transform: scale(1.03);
  cursor: zoom-in;
}`;

export default function ImageGalleryItem({ image }: Props) {
  const { setModal } = useContext(ModalCtx);
  return (
    <Styled onClick={() => setModal(image)}>
      <img src={image.webformatURL} alt={image.tags} />
    </Styled>
  )
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};