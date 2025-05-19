
export default function Footer() {
  return (
    <footer className="bg-blue-50 py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Bệnh viện Hiếm Muộn. All rights reserved.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="/privacy"
            className="text-gray-500 hover:text-blue-700 text-sm"
          >
            Chính sách bảo mật
          </a>
          <a
            href="/terms"
            className="text-gray-500 hover:text-blue-700 text-sm"
          >
            Điều khoản sử dụng
          </a>
        </div>
      </div>
    </footer>
  );
}
