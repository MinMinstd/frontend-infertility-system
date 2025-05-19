import React from "react";

export default function LoginButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      className={`ml-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-200 ${className}`}
      onClick={() => alert("Chức năng đăng nhập!")}
    >
      Đăng nhập
    </button>
  );
}
