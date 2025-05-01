import React from "react";
import { PokemonTypeOption } from "../types/pokemon.ts";
import TypeBadge from "./TypeBadge";

interface TypeFilterProps {
  selectedType: PokemonTypeOption;
  onTypeChange: (type: PokemonTypeOption) => void;
}

const pokemonTypes: PokemonTypeOption[] = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="py-4 mb-4 overflow-x-auto">
      <div className="flex flex-nowrap space-x-2 pb-2 px-4">
        {pokemonTypes.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`transition-transform ${
              selectedType === type
                ? "scale-110 ring-2 ring-white"
                : "hover:scale-105"
            }`}
          >
            <TypeBadge type={type} large />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;
