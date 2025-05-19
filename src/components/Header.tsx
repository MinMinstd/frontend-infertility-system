import LoginButton from "./LoginButton";
import Search from "./Search";

const leftNavLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới Thiệu", href: "/" },
  { name: "Góc Tri Ân", href: "/" },
];
const rightNavLinks = [
  { name: "Đặt lịch hẹn", href: "/appointment" },
  { name: "Liên hệ hỗ trợ", href: "/contact" },
];

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Left nav */}
        <nav className="flex gap-6 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="../public/Images/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="font-bold text-xl text-pink-600">
              Thiên thần nhỏ
            </span>
          </div>

          {leftNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right nav + Login */}
        <nav className="flex gap-6 items-center">
          {rightNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {/* Thêm thanh tìm kiếm */}
          <Search />
          <LoginButton />
        </nav>
      </div>
    </header>
  );
}
