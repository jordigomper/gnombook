import React from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import Image from "./Image";
import styled from "@emotion/styled";

const phantom_gnom = require("../../assets/img/top_secret.jpg");

const CardStyle = styled.div`
  cursor: pointer;
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  p {
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Card = ({ id, thumbnail, name }) => {
  return (
    <CardStyle onClick={() => navigate(`/profile/${id}`)}>
      <Image src={thumbnail} alt={name} title={name} />
      <p>{name}</p>
    </CardStyle>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
};

Card.defaultProps = {
  name: "",
  thumbnail: phantom_gnom
};

export default Card;
