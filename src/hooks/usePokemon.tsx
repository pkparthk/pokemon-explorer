import { useState, useEffect } from "react";
import { Pokemon, PokemonTypeOption } from "../types/pokemon.ts";
import { fetchAllPokemonWithDetails } from "../utils/api.ts";

interface UsePokemonReturn {
  pokemon: Pokemon[];
  filteredPokemon: Pokemon[];
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: PokemonTypeOption;
  setSelectedType: (type: PokemonTypeOption) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function usePokemon(): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<PokemonTypeOption>("all");
  const [sortBy, setSortBy] = useState<string>("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllPokemonWithDetails();
        setPokemon(data);
        setFilteredPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = pokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "all" ||
        p.types.some((t) => t.type.name === selectedType);

      return matchesSearch && matchesType;
    });

    // Sort the filtered Pokemon
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "hp":
          return (
            b.stats.find((s) => s.stat.name === "hp")?.base_stat! -
            a.stats.find((s) => s.stat.name === "hp")?.base_stat!
          );
        case "attack":
          return (
            b.stats.find((s) => s.stat.name === "attack")?.base_stat! -
            a.stats.find((s) => s.stat.name === "attack")?.base_stat!
          );
        case "defense":
          return (
            b.stats.find((s) => s.stat.name === "defense")?.base_stat! -
            a.stats.find((s) => s.stat.name === "defense")?.base_stat!
          );
        case "speed":
          return (
            b.stats.find((s) => s.stat.name === "speed")?.base_stat! -
            a.stats.find((s) => s.stat.name === "speed")?.base_stat!
          );
        default:
          return a.id - b.id;
      }
    });

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon, sortBy]);

  return {
    pokemon,
    filteredPokemon,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
  };
}
