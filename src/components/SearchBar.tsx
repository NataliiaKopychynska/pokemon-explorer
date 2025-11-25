import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder || "Search Pokémon..."}
      className="w-full max-w-md px-4 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
  );
}
