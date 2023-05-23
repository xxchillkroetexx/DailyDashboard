import React from 'react'; /* Bisher ungenutzter Import, wird später gebraucht. Nicht entfernen*/ 
import './MainPage.css';

const MainPage = () => {
  return (
    /* Body der Hauptseite. Design wird aus MainPage.css gezogen */
    <div className="MainPage">
      {/* Die 4 Tiles auf der Seite. Design wird aus MainPage.css gezogen */}
      <div className="tile"> Hier Tile Contetnt einfügen </div>
      <div className="tile"> Hier Tile Contetnt einfügen </div>
      <div className="tile"> Hier Tile Contetnt einfügen </div>
      <div className="tile"> Hier Tile Contetnt einfügen </div>
    </div>
  );
}

export default MainPage;
