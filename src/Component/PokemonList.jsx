import App from "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  //part 3
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
        );
        setPokemonList(response.data.slice(0, 100));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonList();
  }, []);

  //part 3
  const handleBattleOptionChange = (pokemon) => {
    setSelectedPokemon(pokemon);
  };
  return (
    <div className="pokemonlist">
      <h1 className="header">Pokemon List</h1>
      <ul className="list">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <img
              className="img"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name.english}
            />

            <p className="pokename">
              <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name.english}</Link>
            </p>
          </li>
        ))}
      </ul>
      {/* part3 */}
      {/* {selectedPokemon && (
        <div>
          <h3>Selected Pokemon</h3>
          <p>Name: {selectedPokemon.name.english}</p>
          <p>Type: {selectedPokemon.type.join(", ")}</p>
        </div>
      )} */}
    </div>
  );
};

export default PokemonList;
