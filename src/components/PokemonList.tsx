import React from "react";
import { Pokemon } from "../types/pokemon.ts";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemon: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemon,
  onSelectPokemon,
}) => {
  if (pokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <p className="text-xl text-gray-600 mb-4">No Pokémon found</p>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onSelectPokemon}
        />
      ))}
    </div>
  );
};

export default PokemonList;
