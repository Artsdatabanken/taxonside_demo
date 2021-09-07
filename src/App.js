import "./App.css";
import Autocomplete from "./components/Autocomplete";
import Taxon from "./components/Taxon";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [taxon, setTaxon] = useState(false);
  const [taxonData, setTaxonData] = useState(false);

  if (
    taxon &&
    (!taxonData || taxonData.scientificNameID !== taxon.ScientificNameId)
  ) {
    axios
      .get(
        "https://artsdatabanken.no/api/Taxon/ScientificName/" +
          taxon.ScientificNameId
      )
      .then((res) => {
        res.data.vernacularName = taxon.PopularName;
        axios
          .get(
            "https://artsdatabanken.no/api/Resource/Taxon/" + res.data.taxonID
          )
          .then((resource_res) => {
            res.data.resource = resource_res.data;

            axios
            .get(
              "https://artsdatabanken.no/api/Images/species/" + res.data.scientificNameID
            )
            .then((img_res) => {
              res.data.images = img_res.data.data.images;
              setTaxonData(res.data);
            })


          });
      });
  }

  return (
    <div className="App">
      <Autocomplete chooseTaxon={setTaxon} />

      {taxonData && <Taxon taxonData={taxonData} />}
    </div>
  );
}

export default App;
