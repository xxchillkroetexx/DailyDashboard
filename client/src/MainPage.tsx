import React from "react"; /* Bisher ungenutzter Import, wird später gebraucht. Nicht entfernen*/
import "./MainPage.css";
import SiteHeader from "./components/SiteHeader";
import WitzePanel from "./components/WitzePanel"

const MainPage = () => {
  return (
    <>
      <SiteHeader />
      {/* Header mit Darkmode, Name und Login */}
      {/* Body der Hauptseite. Design wird aus MainPage.css gezogen */}
      <div className="MainPage">
        {/* Die 4 Tiles auf der Seite. Design wird aus MainPage.css gezogen */}
        <div className="tile">  <WitzePanel/>  </div>
        <div className="tile"> Hier Tile Contetnt einfügen </div>
        <div className="tile"> Hier Tile Contetnt einfügen </div>
        <div className="tile"> Hier Tile Contetnt einfügen </div>
      </div>
    </>
  );
};

export default MainPage;
