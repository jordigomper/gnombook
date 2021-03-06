import React from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

import { ImageCache } from "../";
import { Container } from "./elements";

export const Card = ({ id, thumbnail, name }) => {
  return (
    <Container onClick={() => navigate(`/profile/${id}`)}>
      <ImageCache src={thumbnail} alt={name} title={name} />
      <p>{name}</p>
    </Container>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
};

Card.defaultProps = {
  name: "",
};
