import { Pokemon, PokemonListResponse } from "../types/pokemon";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPokemonList(
  limit: number = 150
): Promise<PokemonListResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
}

export async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details for ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokémon details for ${url}:`, error);
    throw error;
  }
}

export async function fetchAllPokemonWithDetails(
  limit: number = 150
): Promise<Pokemon[]> {
  try {
    const listResponse = await fetchPokemonList(limit);
    const pokemonDetailsPromises = listResponse.results.map((pokemon) =>
      fetchPokemonDetails(pokemon.url)
    );
    return await Promise.all(pokemonDetailsPromises);
  } catch (error) {
    console.error("Error fetching all Pokémon with details:", error);
    throw error;
  }
}
