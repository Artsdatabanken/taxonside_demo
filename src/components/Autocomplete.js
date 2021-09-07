import React, { useState } from "react";
import axios from "axios";

import "../App.css";

function Autocomplete({chooseTaxon}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const writeValue = () => {
    setInputValue(document.getElementById("reportSpecies").value);
    if (document.getElementById("reportSpecies").value.length > 2) {
      axios
        .get(
          "https://artskart.artsdatabanken.no/appapi/api/data/SearchTaxons?maxCount=5&name=" +
            document.getElementById("reportSpecies").value
        )
        .then((res) => {
          setSuggestions(res.data);
        });
    } else {
      setSuggestions([]);
    }
  };

  const fillValue = (value) => {
    setInputValue(value.ScientificName);
    chooseTaxon(value);
    // console.log(value);
  };



 

  const suggestionItems = [];
  for (const p in [0, 1, 2, 3, 4]) {
    let taxonName;

    if (suggestions.length > p) {
      if (suggestions[p].PopularName.length) {
        taxonName =
          suggestions[p].PopularName +
          " (" +
          suggestions[p].ScientificName +
          ")";
      } else {
        taxonName = suggestions[p].ScientificName;
      }

      suggestionItems.push(
        <div
          className="autocompleteItem"
          key={"pred_" + p}
          onClick={() => fillValue(suggestions[p])}
        >
          {taxonName}
        </div>
      );
    }
  }

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Velg eller søk"
        id="reportSpecies"
        className="textInput"
        value={inputValue}
        onChange={writeValue}
      />
      <div className="autocompleteItems">
        {suggestions.length > 0 && suggestionItems}
      </div>
    </div>
  );
}

export default Autocomplete;
