import React from "react";

import "../App.css";

function ImageGrid({ images }) {

  let images_jsx = [];
  for(let image of images) {
    images_jsx.push(<img src={image} key={image} alt="Taxon" />)
  }

  return <div className="imageGrid">{images_jsx}</div>;
}

export default ImageGrid;
