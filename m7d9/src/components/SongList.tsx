import React from "react";
import { CardProps } from "../types/types";
import { Col } from "react-bootstrap";

const SongList = (props: CardProps) => {
  return (
    <>
      <Col>
        <img src={props.source} alt="imae" />
        <p>{props.title}</p>
      </Col>
    </>
  );
};

export default SongList;
