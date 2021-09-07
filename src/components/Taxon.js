import React from "react";
import parse from "html-react-parser";

import "../App.css";

function Taxon({ taxonData }) {
  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const getVernacularName = () => {
    if (taxonData.vernacularName) {
      return capitalize(taxonData.vernacularName);
    } else {
      return taxonData.scientificName;
    }
  };

  const getDescription = () => {
    if (
      taxonData.resource.Description &&
      taxonData.resource.Description.length
    ) {
      return parse(taxonData.resource.Description[0].Intro);
    } else {
      return "";
    }
  };

  const getDescriptionLink = () => {
    if (
      taxonData.resource.Description &&
      taxonData.resource.Description.length
    ) {
      return taxonData.resource.Description[0].Id.replace(
        "Nodes/",
        "https://artsdatabanken.no/Pages/"
      );
    } else {
      return "";
    }
  };

  const getCoverPicture = () => {
    console.log(taxonData.images);

    if (taxonData.images.length) {
      return taxonData.images[0].url;
    } else {
      return "";
    }
  };

  console.log(taxonData);

  return (
    <div>
      <h1>{getVernacularName()}</h1>
      <h2>
        <i>{taxonData.scientificName}</i>
      </h2>
      <h3>{taxonData.scientificNameAuthorship}</h3>

      <div className="fatBox">
        <img src={getCoverPicture()} alt="First" className="taxonCoverThumb" />
        <div className="taxonDescriptionPreview">


          {getDescription()}
          <a href={getDescriptionLink()}>
              Les mer
            </a>
        </div>
      </div>
    </div>
  );
}

export default Taxon;
