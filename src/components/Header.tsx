import React from "react";
import { Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-x-3 mb-4 sm:mb-0 transform transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            title="Click to refresh"
          >
            <img
              src="/logo.png"
              alt="Pokémon Explorer Logo"
              className="w-10 h-10 drop-shadow-md"
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide drop-shadow-md">
              Pokémon Explorer
            </h1>
          </button>
          
          <div className="relative w-full sm:w-64 md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-200" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full bg-red-700 bg-opacity-50 rounded-lg text-white placeholder-red-100 focus:outline-none focus:ring-2 focus:ring-white focus:bg-red-800 transition-all"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
