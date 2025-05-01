import React from "react";
import { Pokemon } from "../types/pokemon";
import TypeBadge from "./TypeBadge";

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onClose }) => {
  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  // Convert height from decimeters to meters and weight from hectograms to kilograms
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-gray-100 p-8 rounded-t-lg flex justify-center">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {capitalizedName}
            </h2>
            <span className="text-lg font-mono text-gray-500">
              {formattedId}
            </span>
          </div>

          <div className="mb-4">
            {pokemon.types.map((typeInfo) => (
              <TypeBadge
                key={typeInfo.type.name}
                type={typeInfo.type.name}
                large
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-medium">{heightInMeters} m</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">{weightInKg} kg</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Stats</h3>
          <div className="space-y-2 mb-6">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {stat.stat.name
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700"
              >
                {ability.ability.name
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
