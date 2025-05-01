import React, { useState } from "react";
import { Pokemon } from "../types/pokemon.ts";
import TypeBadge from "./TypeBadge.tsx";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const maxStat = Math.max(...pokemon.stats.map((stat) => stat.base_stat));
  const dominantStat = pokemon.stats.find((stat) => stat.base_stat === maxStat);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(pokemon)}
    >
      <div className="bg-gray-100 p-4 flex justify-center relative">
        {!imageLoaded && (
          <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse absolute"></div>
        )}
        <img
          src={imageUrl}
          alt={pokemon.name}
          className={`w-32 h-32 object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">{capitalizedName}</h2>
          <span className="text-sm font-mono text-gray-500">{formattedId}</span>
        </div>

        <div className="mb-3">
          {pokemon.types.map((typeInfo) => (
            <TypeBadge key={typeInfo.type.name} type={typeInfo.type.name} />
          ))}
        </div>

        {dominantStat && (
          <div className="mt-2 text-sm text-gray-600">
            Highest stat: {dominantStat.stat.name.replace("-", " ")} (
            {dominantStat.base_stat})
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
