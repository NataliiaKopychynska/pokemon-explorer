import { typeColors } from "../utils/typeColors";

interface TypeFilterProps {
  types: string[];
  selectedTypes: string[];
  onToggle: (typeName: string) => void;
}

export default function TypeFilter({
  types,
  selectedTypes,
  onToggle,
}: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-[4px] justify-center mb-6">
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type);
        return (
          <button
            key={type}
            onClick={() => onToggle(type)}
            className={`p-[4px] text-base rounded-full text-white font-semibold capitalize transition-all
              ${isSelected ? "border-2 border-white" : ""}
            `}
            style={{ backgroundColor: typeColors[type] || "#888" }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
