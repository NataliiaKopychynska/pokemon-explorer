# Pokémon Explorer

A simple React application to browse and search Pokémon. Users can filter by type, search by name, and view detailed information in a modal.

---

## Features

* Browse Pokémon in a grid layout.
* Filter Pokémon by type.
* Search Pokémon by name.
* Click on a Pokémon to open a modal with details:

  * Sprites/images
  * Evolutions
  * Locations
* Load more Pokémon with pagination.

---

## Tech Stack

* **React** + **TypeScript**
* **Tailwind CSS** for styling
* **Headless UI** for modal component
* **PokéAPI** as data source

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pokemon-explorer.git
cd pokemon-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
src/
 ├─ api/           # API functions (getPokemon, getPokemonById)
 ├─ components/    # Reusable components (PokemonCard, PokemonList, Modal, SearchBar, TypeFilter)
 ├─ pages/         # Page components (HomeP)
 ├─ utils/         # Types, constants (typeColors)
 └─ App.tsx
```

---

## API Usage

* **PokéAPI**: `https://pokeapi.co/api/v2/`
* `getPokemon(name: string)`: fetch Pokémon details by name.
* `getPokemonById(id: number)`: fetch Pokémon details by ID.

---

## How to Use

1. Browse the Pokémon grid.
2. Filter by type using the type buttons.
3. Search by name using the search bar.
4. Click on a Pokémon card to see detailed info in a modal.
5. Use "Load More" to fetch additional Pokémon.

---

## Notes

* The modal loads Pokémon data by ID asynchronously.
* Background colors of Pokémon cards match their type(s) using a gradient if multiple types.
* Loading states are shown when fetching Pokémon details.

---

## License

This project is licensed under the MIT License.

