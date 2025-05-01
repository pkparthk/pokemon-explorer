import React from "react";
import { Pokemon } from "../types/pokemon.ts";

interface StatsOverviewProps {
  pokemon: Pokemon[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ pokemon }) => {
  const typeCount = pokemon.reduce((acc, p) => {
    p.types.forEach((t) => {
      acc[t.type.name] = (acc[t.type.name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const mostCommonType = Object.entries(typeCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const averageStats = pokemon.reduce((acc, p) => {
    p.stats.forEach((stat) => {
      acc[stat.stat.name] = (acc[stat.stat.name] || 0) + stat.base_stat;
    });
    return acc;
  }, {} as Record<string, number>);

  Object.keys(averageStats).forEach((key) => {
    averageStats[key] = Math.round(averageStats[key] / pokemon.length);
  });

  const stats = [
    { label: "Total Pokémon", value: pokemon.length },
    {
      label: "Most Common Type",
      value: mostCommonType
        ? `${mostCommonType[0]} (${mostCommonType[1]})`
        : "N/A",
    },
    { label: "Avg. HP", value: averageStats["hp"] || 0 },
    { label: "Avg. Attack", value: averageStats["attack"] || 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white transform hover:scale-105 transition-transform duration-200"
        >
          <h3 className="text-sm font-medium text-red-100">{stat.label}</h3>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
