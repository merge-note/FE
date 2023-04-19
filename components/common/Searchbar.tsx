import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  bgColor?: string;
  placeholder?: string;
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
}

const Searchbar = ({
  bgColor,
  placeholder,
  value,
  handleChange,
  handleKeyDown,
}: Props) => {
  return (
    <div className="w-full relative">
      <div className="absolute top-1.5 left-2">
        <SearchIcon className="text-gray-400 z-20 hover:text-gray-500" />
      </div>

      <input
        type="text"
        className={`h-10 w-full pl-10 pr-3 z-0 text-md border-2 outline-none ${bgColor}`}
        placeholder={placeholder || "Search"}
        value={value}
        onChange={(e) => handleChange && handleChange(e)}
        onKeyDown={(e) => handleKeyDown && handleKeyDown(e)}
      />
    </div>
  );
};

export default Searchbar;
