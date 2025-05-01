import React from "react";
import { motion } from "framer-motion";
import { Pokemon } from "../types/pokemon";

interface StatComparisonProps {
  pokemon: Pokemon[];
}

const StatComparison: React.FC<StatComparisonProps> = ({ pokemon }) => {
  const maxStats = pokemon.reduce((acc, p) => {
    p.stats.forEach((stat) => {
      if (!acc[stat.stat.name] || stat.base_stat > acc[stat.stat.name]) {
        acc[stat.stat.name] = stat.base_stat;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const topPokemon = Object.entries(maxStats).map(([statName, maxValue]) => {
    const pokemonWithStat = pokemon.find((p) =>
      p.stats.some((s) => s.stat.name === statName && s.base_stat === maxValue)
    );
    return {
      statName,
      maxValue,
      pokemon: pokemonWithStat,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Performers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPokemon.map(({ statName, maxValue, pokemon }) => (
          <motion.div
            key={statName}
            className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-4">
              {pokemon && (
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-16 h-16"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 capitalize">
                  {statName.replace("-", " ")}
                </h3>
                <p className="text-sm text-gray-600">
                  {(pokemon?.name?.charAt(0).toUpperCase() || "") +
                    (pokemon?.name?.slice(1) || "")}
                </p>
                <p className="text-2xl font-bold text-red-600">{maxValue}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatComparison;
