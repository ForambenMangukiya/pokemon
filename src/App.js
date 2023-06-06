import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./Component/PokemonList";
import PokemonDetails from "./Component/PokemonDetails";
import BattlePage from "./Component/BattlePage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={PokemonList} />
          <Route path="/pokemon/:id" Component={PokemonDetails} />
          <Route path="/fight" Component={BattlePage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
