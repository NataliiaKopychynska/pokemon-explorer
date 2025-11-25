export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
}
