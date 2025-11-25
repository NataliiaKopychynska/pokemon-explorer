import type { Pokemon } from "../utils/types";
import PokemonCard from "./PokemonCard";

interface Props {
  pokemons: Pokemon[];
  onPokemonClick: (pokemon: Pokemon) => void;
}

export default function PokemonList({ pokemons, onPokemonClick }: Props) {
  return (
    <ul className="grid grid-cols-3 gap-[8px] justify-items-center">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={() => onPokemonClick(p)} />
      ))}
    </ul>
  );
}
