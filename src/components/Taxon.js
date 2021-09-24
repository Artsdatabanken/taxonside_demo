import React from "react";
import parse from "html-react-parser";
import RedlistStatus from "./RedlistStatus";

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
      taxonData.resource.Description.length &&
      typeof taxonData.resource.Description[0].Intro == "string"
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

  let coverPicture;

  if (taxonData.images.length) {
    coverPicture = (
      <img
        src={taxonData.images[0].url}
        alt="First"
      />
    );
  }
  else {
    coverPicture = (
      <img
        src="./undraw_photos_1nui.svg"
        alt="Ingen bilde"
        className="taxonCoverMissing"
      />
    );
  }

  const ancestry = [];
  for (const [index, value] of taxonData.higherClassification.entries()) {
    ancestry.push(
      <a href="#" key={index}>
        {value.scientificName}
      </a>
    );
    ancestry.push(" / ");
  }
  ancestry.pop();
  console.log(taxonData);

  return (
    <div>
      <div className="header">
        <div className="ancestry">{ancestry}</div>

        <span className="vernacular title">{getVernacularName()}</span>
        <span className="scientific title">{taxonData.scientificName}</span>
        <span className="author">{taxonData.scientificNameAuthorship}</span>
      </div>

      <div className="content">
        {coverPicture}

        <div className="sidebox">
          <RedlistStatus status={taxonData.resource.Kategori} />
        </div>
        <div className="taxonDescriptionPreview">
          <h2>Beskrivelse</h2>
          {getDescription()}
          <a href={getDescriptionLink()}>Les mer</a>
        </div>
      </div>
    </div>
  );
}

export default Taxon;
