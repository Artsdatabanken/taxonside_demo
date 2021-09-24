import React from "react";

import "../App.css";

function RedlistStatus({ status }) {
  const categories = ["RE", "CR", "EN", "VU", "NT", "DD", "LC", "NA", "NE"];
  const labels = {
    "RE": "Regionalt utdødd",
    "CR": "Kritisk truet",
    "EN": "Sterkt truet",
    "VU": "Sårbar",
    "NT": "Nær truet",
    "DD": "Datamangel",
    "LC": "Livskraftig",
    "NA": "Ikke egnet",
    "NE": "Ikke vurdert"
  };

  const statuses = [];
  for (const [index, value] of categories.entries()) {
    statuses.push(
      <span
        key={index}
        className={`redlist ${value} ${value == status ? "selected" : ""}`}
      >
        {value}
      </span>
    );
  }

  return (
    <div>
        {statuses}
        <div className="redlistLabel">
        {labels[status]}

        </div>
    </div>
  );
}

export default RedlistStatus;
