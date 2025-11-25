export interface PokemonType {
  type: { name: string };
}

export interface PokemonSprites {
  front_default: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
    [key: string]: string | undefined;
  };
  types: { type: { name: string } }[];

  evolutions?: string[];
  locations?: string[];
}
