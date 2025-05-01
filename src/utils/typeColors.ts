import { PokemonTypeOption } from "../types/pokemon";

interface TypeColorMap {
  [key: string]: {
    background: string;
    text: string;
  };
}

export const typeColors: TypeColorMap = {
  normal: { background: "#A8A77A", text: "#fff" },
  fire: { background: "#EE8130", text: "#fff" },
  water: { background: "#6390F0", text: "#fff" },
  electric: { background: "#F7D02C", text: "#000" },
  grass: { background: "#7AC74C", text: "#fff" },
  ice: { background: "#96D9D6", text: "#000" },
  fighting: { background: "#C22E28", text: "#fff" },
  poison: { background: "#A33EA1", text: "#fff" },
  ground: { background: "#E2BF65", text: "#000" },
  flying: { background: "#A98FF3", text: "#fff" },
  psychic: { background: "#F95587", text: "#fff" },
  bug: { background: "#A6B91A", text: "#fff" },
  rock: { background: "#B6A136", text: "#fff" },
  ghost: { background: "#735797", text: "#fff" },
  dragon: { background: "#6F35FC", text: "#fff" },
  dark: { background: "#705746", text: "#fff" },
  steel: { background: "#B7B7CE", text: "#000" },
  fairy: { background: "#D685AD", text: "#fff" },
  all: { background: "#333333", text: "#fff" },
};

export function getTypeColor(type: PokemonTypeOption): {
  background: string;
  text: string;
} {
  return typeColors[type] || { background: "#888888", text: "#fff" };
}
