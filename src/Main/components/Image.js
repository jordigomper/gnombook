import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Img = styled.img`
  width: 100%;
`;

const ImageCache = ({ src, alt, title }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    const img = new Image();
    img.onload = function() {
      setImage(img.src);
    };
    img.src = src;
  }, []);

  return <Img src={image} alt={alt} title={title} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

Image.defaultProps = {
  src: null,
  alt: null,
  title: null
};

export default ImageCache;
