import React, { useState, useEffect } from "react";
import axios from "axios";

const BattlePage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [pokemonImage1, setPokemonImage1] = useState("");
  const [pokemonImage2, setPokemonImage2] = useState("");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
        );
        setPokemonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, []);

  const handlePokemonSelect = (pokemon, id) => {
    if (id === 1) {
      setSelectedPokemon1(pokemon);
      const selectedPokemon1Data = pokemonData.find(
        (pokemonData) => pokemonData.name.english === pokemon
      );
      if (selectedPokemon1Data) {
        setPokemonImage1(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon1Data.id}.png`
        );
      }
    } else if (id === 2) {
      setSelectedPokemon2(pokemon);
      const selectedPokemon2Data = pokemonData.find(
        (pokemonData) => pokemonData.name.english === pokemon
      );
      if (selectedPokemon2Data) {
        setPokemonImage2(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon2Data.id}.png`
        );
      }
    }
  };

  const handleBattle = () => {
    if (selectedPokemon1 && selectedPokemon2) {
      const pokemon1 = pokemonData.find(
        (pokemon) => pokemon.name.english === selectedPokemon1
      );
      const pokemon2 = pokemonData.find(
        (pokemon) => pokemon.name.english === selectedPokemon2
      );

      if (pokemon1.base.Speed > pokemon2.base.Speed) {
        setWinner(selectedPokemon1);
      } else if (pokemon2.base.Speed > pokemon1.base.Speed) {
        setWinner(selectedPokemon2);
      } else {
        setWinner("It's a tie!");
      }
    }
  };

  return (
    <div className="battle">
      <h1 className="battleheader">Select Pokémon for Battle</h1>
      <button className="button" onClick={handleBattle}>
        Battle!
      </button>
      {winner && <h2 className="winner">The winner is: {winner}</h2>}
      <div className="player">
        <label>Player 1: </label>
        <select onChange={(e) => handlePokemonSelect(e.target.value, 1)}>
          <option value="">Select Pokémon</option>
          {pokemonData.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.name.english}>
              {pokemon.name.english}
            </option>
          ))}
        </select>
        {pokemonImage1 && (
          <img
            className="battleimg1"
            src={pokemonImage1}
            alt={selectedPokemon1}
          />
        )}
      </div>
      <div className="player2">
        <label>Player 2: </label>
        <select onChange={(e) => handlePokemonSelect(e.target.value, 2)}>
          <option value="">Select Pokémon</option>
          {pokemonData.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.name.english}>
              {pokemon.name.english}
            </option>
          ))}
        </select>
        {pokemonImage2 && (
          <img
            className="battleimg2"
            src={pokemonImage2}
            alt={selectedPokemon2}
          />
        )}
      </div>
    </div>
  );
};

export default BattlePage;
