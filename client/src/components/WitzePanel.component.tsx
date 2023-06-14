import GetWitz from "../services/GetWitz.service";
import React from "react";

function WitzePanel() {
  return (
    <div>
      <h2>Der Witz des Tages</h2>
      <GetWitz />
    </div>
  );
}

export default WitzePanel;
