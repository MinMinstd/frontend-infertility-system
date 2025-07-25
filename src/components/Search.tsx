import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");
  return (
    <form className="relative flex items-center w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Dịch vụ, Bảng giá..."
        className="pl-12 pr-4 py-3 rounded-full border-2 border-pastelPink-light focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all text-base bg-white placeholder-pink-300 font-medium shadow-md w-full"
        style={{ minWidth: 220 }}
      />
      <MagnifyingGlassIcon className="absolute left-4 h-6 w-6 text-pink-300 pointer-events-none" />
    </form>
  );
}
