import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");
  return (
    <form className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Dịch vụ, Bảng giá..."
        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-sm bg-gray-50 placeholder-gray-400"
        style={{ minWidth: 160 }}
      />
      <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
    </form>
  );
}
