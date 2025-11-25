// import React, { useEffect, useState } from "react";
// import PokemonList from "../components/PokemonList";
// import TypeFilter from "../components/TypeFilter";
// import SearchBar from "../components/SearchBar";
// import type { Pokemon } from "../utils/types";
// import { getPokemon } from "../api";
// import PokemonModal from "../components/PokemonModal";

// interface PokemonResult {
//   name: string;
//   url: string;
// }

// interface PokemonTypeResponse {
//   pokemon: { pokemon: PokemonResult }[];
// }

// export default function HomeP() {
//   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
//   const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
//   const [offset, setOffset] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [types, setTypes] = useState<string[]>([]);
//   const [currentType, setCurrentType] = useState<string | null>(null);
//   const [allTypePokemons, setAllTypePokemons] = useState<PokemonResult[]>([]);
//   const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const limit = 24;

//   const loadTypes = async () => {
//     try {
//       const res = await fetch("https://pokeapi.co/api/v2/type");
//       const data = await res.json();
//       const typeNames = data.results.map((t: { name: string }) => t.name);
//       setTypes(typeNames);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadPokemons = async () => {
//     setLoading(true);
//     try {
//       let nextSlice: PokemonResult[] = [];
//       if (currentType) {
//         nextSlice = allTypePokemons.slice(offset, offset + limit);
//       } else {
//         const res = await fetch(
//           `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
//         );
//         const data = await res.json();
//         nextSlice = data.results;
//       }

//       const fullData = await Promise.all(
//         nextSlice.map((p) => getPokemon(p.name))
//       );
//       setPokemons((prev) => [...prev, ...fullData]);
//       setDisplayedPokemons((prev) => [...prev, ...fullData]);
//       setOffset((prev) => prev + limit);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectType = async (typeName: string) => {
//     setCurrentType(typeName);
//     setOffset(0);
//     setPokemons([]);
//     setDisplayedPokemons([]);

//     try {
//       const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
//       const data: PokemonTypeResponse = await res.json();
//       const typePokemons = data.pokemon.map((p) => p.pokemon);
//       setAllTypePokemons(typePokemons);

//       const firstSlice = typePokemons.slice(0, limit);
//       const fullData = await Promise.all(
//         firstSlice.map((p) => getPokemon(p.name))
//       );
//       setPokemons(fullData);
//       setDisplayedPokemons(fullData);
//       setOffset(limit);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSearch = (query: string) => {
//     if (!query) {
//       setDisplayedPokemons(pokemons);
//     } else {
//       const filtered = pokemons.filter((p) =>
//         p.name.toLowerCase().includes(query)
//       );
//       setDisplayedPokemons(filtered);
//     }
//   };

//   useEffect(() => {
//     loadTypes();
//     loadPokemons();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex items-center justify-center gap-2 mb-4">
//         <img src="/poke-ball.png" alt="Pokeball" className="w-8 h-8" />
//         <h1 className="text-3xl font-bold text-white">Pokemon Explorer</h1>
//       </div>

//       <div className="flex justify-center mb-4">
//         <SearchBar onSearch={handleSearch} placeholder="Search Pokémon..." />
//       </div>

//       <TypeFilter
//         types={types}
//         selectedTypes={currentType ? [currentType] : []}
//         onToggle={(type) => selectType(type)}
//       />

//       <PokemonList
//         pokemons={displayedPokemons}
//         onClick={() => {
//           setSelectedPokemon(p.name);
//           setIsModalOpen(true);
//         }}
//       />

//       <div className="text-center mt-6">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={loadPokemons}
//             disabled={currentType ? offset >= allTypePokemons.length : false}
//           >
//             Load More
//           </button>
//         )}
//       </div>
//       <PokemonModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         pokemonName={selectedPokemon}
//       />
//     </div>
//   );
// }

/// pages/HomeP.tsx
import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import TypeFilter from "../components/TypeFilter";
import SearchBar from "../components/SearchBar";
import PokemonModal from "../components/PokemonModal";
import type { Pokemon } from "../utils/types";
import { getPokemon } from "../api";

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonTypeResponse {
  pokemon: { pokemon: PokemonResult }[];
}

export default function HomeP() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [currentType, setCurrentType] = useState<string | null>(null);
  const [allTypePokemons, setAllTypePokemons] = useState<PokemonResult[]>([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 24;

  const loadTypes = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      const typeNames = data.results.map((t: { name: string }) => t.name);
      setTypes(typeNames);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPokemons = async () => {
    setLoading(true);
    try {
      let nextSlice: PokemonResult[] = [];
      if (currentType) {
        nextSlice = allTypePokemons.slice(offset, offset + limit);
      } else {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();
        nextSlice = data.results;
      }

      const fullData = await Promise.all(
        nextSlice.map((p) => getPokemon(p.name))
      );

      setPokemons((prev) => {
        const newPokemons = fullData.filter(
          (p) => !prev.some((prevP) => prevP.id === p.id)
        );
        return [...prev, ...newPokemons];
      });

      setDisplayedPokemons((prev) => {
        const newDisplayed = fullData.filter(
          (p) => !prev.some((prevP) => prevP.id === p.id)
        );
        return [...prev, ...newDisplayed];
      });
      setOffset((prev) => prev + limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectType = async (typeName: string) => {
    setCurrentType(typeName);
    setOffset(0);
    setPokemons([]);
    setDisplayedPokemons([]);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
      const data: PokemonTypeResponse = await res.json();
      const typePokemons = data.pokemon.map((p) => p.pokemon);
      setAllTypePokemons(typePokemons);

      const firstSlice = typePokemons.slice(0, limit);
      const fullData = await Promise.all(
        firstSlice.map((p) => getPokemon(p.name))
      );
      setPokemons(fullData);
      setDisplayedPokemons(fullData);
      setOffset(limit);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setDisplayedPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedPokemons(filtered);
    }
  };

  useEffect(() => {
    loadTypes();
    loadPokemons();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <img src="/poke-ball.png" alt="Pokeball" className="w-8 h-8" />
        <h1 className="text-3xl font-bold text-white">Pokemon Explorer</h1>
      </div>

      <div className="flex justify-center mb-4">
        <SearchBar onSearch={handleSearch} placeholder="Search Pokémon..." />
      </div>

      <TypeFilter
        types={types}
        selectedTypes={currentType ? [currentType] : []}
        onToggle={(type) => selectType(type)}
      />

      <PokemonList
        pokemons={displayedPokemons}
        onPokemonClick={(pokemon) => {
          setSelectedPokemonId(pokemon.id);
          setIsModalOpen(true);
        }}
      />

      <div className="text-center mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={loadPokemons}
            disabled={currentType ? offset >= allTypePokemons.length : false}
          >
            Load More
          </button>
        )}
      </div>

      <PokemonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemonId={selectedPokemonId}
      />
    </div>
  );
}
