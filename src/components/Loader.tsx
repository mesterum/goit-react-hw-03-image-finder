import PropTypes from "prop-types";

import { Blocks } from 'react-loader-spinner'
  ;
type Props = { visible: boolean }


export default function Loader({ visible }: Props) {
  return <Blocks
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    visible={visible}
  />
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};