import type { Pokemon } from "../utils/types";
import { typeColors } from "../utils/typeColors";

// interface Props {
//   pokemon: Pokemon;
//   onClick: () => void;
// }

// export default function PokemonCard({ pokemon, onClick }: Props) {
//   const { id, name, sprites, types } = pokemon;
//   const bg =
//     types.length === 1
//       ? typeColors[types[0].type.name] || "#888"
//       : `linear-gradient(135deg, ${types
//           .map(
//             (t, i) =>
//               `${typeColors[t.type.name] || "#888"} ${Math.floor(
//                 (i / (types.length - 1)) * 100
//               )}%`
//           )
//           .join(", ")})`;

//   return (
//     <div
//       onClick={onClick}
//       className=" flex contain flex-col gap-[8px] items-center w-full rounded-[16px] "
//       style={{ background: bg }}
//     >
//       <img
//         src={sprites.front_default || "/fallback.png"}
//         alt={name}
//         className="w-[120px] w-[120px] object-contain"
//       />
//       <h2 className="capitalize text-lg font-bold text-white text-center">
//         {name}
//       </h2>
//       <p className="text-white text-sm">#{id}</p>
//       <div className="flex gap-[8px]  justify-center">
//         {types.map((t) => (
//           <span
//             key={t.type.name}
//             className=" py-1 p-[4px] rounded-full text-sm text-white font-semibold"
//             style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
//           >
//             {t.type.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

interface Props {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
  const { id, name, sprites, types } = pokemon;
  const bg =
    types.length === 1
      ? typeColors[types[0].type.name] || "#888"
      : `linear-gradient(135deg, ${types
          .map(
            (t, i) =>
              `${typeColors[t.type.name] || "#888"} ${Math.floor(
                (i / (types.length - 1)) * 100
              )}%`
          )
          .join(", ")})`;

  return (
    <div
      onClick={onClick}
      className=" flex contain flex-col gap-[8px] items-center w-full rounded-[16px] "
      style={{ background: bg }}
    >
      <img
        src={sprites.front_default || "/fallback.png"}
        alt={name}
        className="w-[120px] w-[120px] object-contain"
      />
      <h2 className="capitalize text-lg font-bold text-white text-center">
        {name}
      </h2>
      <p className="text-white text-sm">#{id}</p>
      <div className="flex gap-[8px]  justify-center">
        {types.map((t) => (
          <span
            key={t.type.name + id}
            className="p-[4px] rounded-full text-sm text-white font-semibold"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
