import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header.tsx";
import PokemonList from "./components/PokemonList.tsx";
import TypeFilter from "./components/TypeFilter.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import ErrorDisplay from "./components/ErrorDisplay.tsx";
import PokemonDetail from "./components/PokemonDetail.tsx";
import StatsOverview from "./components/StatsOverview.tsx";
import StatComparison from "./components/StatComparison";
import SortControls from "./components/SortControls";
import { usePokemon } from "./hooks/usePokemon";
import { Pokemon } from "./types/pokemon";

function App() {
  const {
    filteredPokemon,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    pokemon: allPokemon,
  } = usePokemon();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <AnimatePresence>
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white shadow-sm"
          >
            <div className="container mx-auto px-4 py-4">
              <StatsOverview pokemon={allPokemon} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />

      <main className="flex-1">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay error={error} onRetry={handleRetry} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  Showing {filteredPokemon.length} of {allPokemon.length}{" "}
                  Pokémon
                </p>
                <SortControls sortBy={sortBy} onSortChange={setSortBy} />
              </div>

              <PokemonList
                pokemon={filteredPokemon}
                onSelectPokemon={handleSelectPokemon}
              />

              <StatComparison pokemon={allPokemon} />
            </div>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;