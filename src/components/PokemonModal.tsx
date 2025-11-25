import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { Pokemon } from "../utils/types";
import { getPokemon, getPokemonById } from "../api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pokemonId: number | null;
}

export default function PokemonModal({ isOpen, onClose, pokemonId }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pokemonId) return;

    setLoading(true);
    setPokemon(null);

    getPokemonById(pokemonId)
      .then((data) => setPokemon(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [pokemonId]);

  if (!pokemon) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                {loading ? (
                  <p className="text-white text-center">Loading...</p>
                ) : pokemon ? (
                  <div className="flex flex-col items-center gap-4">
                    <h2 className="text-2xl font-bold text-white capitalize">
                      {pokemon.name}
                    </h2>

                    <div className="flex gap-2">
                      {Object.values(pokemon.sprites)
                        .filter((s) => typeof s === "string")
                        .map((sprite, i) => (
                          <img
                            key={i}
                            src={sprite as string}
                            alt={`${pokemon.name}-${i}`}
                            className="w-20 h-20"
                          />
                        ))}
                    </div>

                    <div className="mt-4 text-white w-full">
                      <h3 className="font-semibold">Evolutions:</h3>
                      <p>{pokemon.evolutions?.join(" → ") || "None"}</p>
                    </div>

                    <div className="mt-4 text-white w-full">
                      <h3 className="font-semibold">Locations:</h3>
                      {pokemon.locations?.length ? (
                        <ul className="list-disc list-inside">
                          {pokemon.locations.map((loc, i) => (
                            <li key={i}>{loc.replace("-", " ")}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Unknown</p>
                      )}
                    </div>

                    <button
                      onClick={onClose}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <p className="text-white text-center">
                    Failed to load Pokémon
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
