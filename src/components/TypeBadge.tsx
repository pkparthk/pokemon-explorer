import React from "react";
import { PokemonTypeOption } from "../types/pokemon.ts";
import { getTypeColor } from "../utils/typeColors.ts";

interface TypeBadgeProps {
  type: string;
  large?: boolean;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, large = false }) => {
  const { background, text } = getTypeColor(type as PokemonTypeOption);

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2 ${
        large ? "text-sm px-4 py-1.5" : ""
      }`}
      style={{ backgroundColor: background, color: text }}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default TypeBadge;
