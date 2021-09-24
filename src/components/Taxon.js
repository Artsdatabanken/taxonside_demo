import React from "react";
import parse from "html-react-parser";
import RedlistStatus from "./RedlistStatus";

import "../App.css";

function Taxon({ taxonData }) {
  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  let vernacularName;

  if (taxonData.vernacularName) {
    vernacularName = taxonData.vernacularName;
  } else {
    vernacularName = taxonData.scientificName;
  }

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
    coverPicture = <img src={taxonData.images[0].url} alt="First" />;
  } else {
    coverPicture = (
      <img
        src="./undraw_photos_1nui.svg"
        alt="Ingen bilde"
        className="taxonCoverMissing"
      />
    );
  }

  let ancestry = [];
  for (let value of taxonData.higherClassification) {
    ancestry.push(
      <a href={`?${value.scientificNameID}`} key={value.scientificNameID}>
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

        <span className="vernacular title">{capitalize(vernacularName)}</span>
        <span className="scientific title">{taxonData.scientificName}</span>
        <span className="author">{taxonData.scientificNameAuthorship}</span>
      </div>

      <div className="content">
        {coverPicture}

        <div className="sidebox">
          <h2>Status</h2>
          <RedlistStatus status={taxonData.resource.Kategori} />

          <div className="map">
            <h2>Observasjoner av {vernacularName}</h2>
            <img
              alt={`Kart over ${vernacularName}`}
              src={`
          https://artskart.artsdatabanken.no/appapi/api/raster/distribution/?BBOX=-350770,6400000,1100000,9000000&height=800&width=500&ScientificNameId=${taxonData.scientificNameID}`}
            />
          </div>
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
