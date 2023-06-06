import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import App from "../App.css";

const PokemonDetails = () => {
  const [PokemonDetails, setPokemonDetails] = useState(null);
  const { id } = useParams();
  //part 3
  const [battleOptions, setBattleOptions] = useState(null);

  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      );
      const pokemonData = response.data.find((pokemon) => pokemon.id == id);
      setPokemonDetails(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);
  //part 3
  const handleBattleOptionChange = (option) => {
    setBattleOptions(option);
  };
  //   if (!PokemonDetails) {
  //     return <div>Loading...</div>;
  //   }

  return (
    PokemonDetails && (
      <div className="details">
        <ul className="detailss">
          <li key={PokemonDetails.id}>
            <img
              className="image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokemonDetails.id}.png`}
              alt={PokemonDetails.name.english}
            />
            {/* <p>
              <Link to={`/fight`}>{PokemonDetails.name.english}</Link>
            </p> */}
          </li>
        </ul>
        <h1 className="name">
          <Link to={`/fight`}>{PokemonDetails.name.english}</Link>
        </h1>
        <p className="types">
          {PokemonDetails.type.map((chicken) => (
            <div className="type">{chicken}</div>
          ))}
        </p>
        <div className="base">
          <p className="bases">HP: {PokemonDetails.base.HP}</p>
          <p className="bases">Attack: {PokemonDetails.base.Attack}</p>
          <p className="bases">Defense: {PokemonDetails.base.Defense}</p>
          <p className="bases">
            Sp. Attack: {PokemonDetails.base["Sp. Attack"]}
          </p>
          <p className="bases">
            Sp. Defense: {PokemonDetails.base["Sp. Defense"]}
          </p>
          <p className="bases">Speed: {PokemonDetails.base.Speed}</p>
        </div>

        {/* part 3 */}
        {/* <h3>Battle Options</h3>
        <label>
          <input
            type="radio"
            value="attack"
            checked={battleOptions === "attack"}
            onChange={() => handleBattleOptionChange("attack")}
          />
          Attack
        </label>
        <label>
          <input
            type="radio"
            value="defend"
            checked={battleOptions === "defend"}
            onChange={() => handleBattleOptionChange("defend")}
          />
          Defend
        </label>
        <label>
          <input
            type="radio"
            value="special"
            checked={battleOptions === "special"}
            onChange={() => handleBattleOptionChange("special")}
          />
          Special Move
        </label> */}
      </div>
    )
  );
};

export default PokemonDetails;
