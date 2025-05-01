import React from "react";
import { ArrowUpDown } from "lucide-react";

interface SortControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex items-center space-x-4 px-4 py-2 bg-white rounded-lg shadow-sm">
      <ArrowUpDown className="w-5 h-5 text-gray-500" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="form-select bg-transparent border-none text-gray-700 focus:ring-0"
      >
        <option value="id">ID (Default)</option>
        <option value="name">Name</option>
        <option value="hp">HP</option>
        <option value="attack">Attack</option>
        <option value="defense">Defense</option>
        <option value="speed">Speed</option>
      </select>
    </div>
  );
};

export default SortControls;