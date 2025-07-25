/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelPink: {
          light: '#FADADD', // Hồng pastel nhạt
          DEFAULT: '#F8BBD0', // Hồng pastel chủ đạo
          dark: '#F9E6F0', // Hồng pastel đậm hơn
        },
        white: '#FFFFFF',
        softGray: '#F5F5F5', // Xám nhạt làm nền phụ
        accent: '#B39DDB', // Màu nhấn nhẹ nhàng (tím pastel)
      },
    },
  },
  plugins: [],
};
