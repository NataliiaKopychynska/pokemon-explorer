import type { Pokemon } from "./utils/types";

export async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    throw new Error(`Pokemon ${name} not found`);
  }
  const data: Pokemon = await res.json();
  return data;
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Failed to fetch Pokemon");
    const data = await res.json();

    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      types: data.types,
      evolutions: [],
      locations: [],
    };

    return pokemon;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
