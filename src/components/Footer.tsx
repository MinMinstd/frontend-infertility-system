export default function Footer() {
  return (
    <footer className="bg-pink-600">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1: Logo + tên thương hiệu */}
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center mb-4">
              <img
                src="../public/Images/logo.png"
                alt="Logo"
                className="h-12 w-12 rounded-full mr-2"
              />
              <span className="font-bold text-2xl text-white">Mẹ và bé</span>
            </a>
            <span className="text-white text-sm text-center md:text-left">
              © 2025. SoftwareProject. All Rights Reserved.
            </span>
          </div>

          {/* Cột 2: Thông tin liên hệ */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h2 className="text-base font-semibold uppercase text-white mb-2">
              Liên hệ
            </h2>
            <div className="text-white text-sm">
              <div className="mb-1">
                <span className="font-medium">Địa chỉ:</span> 123 ABC , P. VVV, Q.QQQ, Hồ Chí Minh.
              </div>
              <div className="mb-1">
                <span className="font-medium">Hotline:</span> 087.XXX.XXX
              </div>
              <div className="mb-1">
                <span className="font-medium">Tổng đài:</span> 024.3455.XXX
              </div>
              <div className="mb-1">
                <span className="font-medium">Email:</span> contact@mevabe.com
              </div>
              <div>
                <span className="font-medium">Lịch làm việc:</span> Thứ 2 - Thứ
                7: 7h30 - 17h00 | Chủ Nhật: 7h30 - 12h00 (Chiều nghỉ)
              </div>
            </div>
          </div>

          {/* Cột 3: Mạng xã hội + form nhập email */}
          <div className="flex flex-col items-center md:items-end">
            <form className="w-full max-w-xs mb-4">
              <label
                htmlFor="footer-email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Đăng ký nhận tin
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="footer-email"
                  className="bg-white bg-opacity-20 border border-white text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 placeholder-white placeholder-opacity-80"
                  placeholder="Nhập email của bạn"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-white text-pink-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition font-bold"
                >
                  Gửi
                </button>
              </div>
            </form>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Facebook</span>
                {/* Facebook SVG */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Twitter</span>
                {/* Twitter SVG */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Dribbble</span>
                {/* Dribbble SVG */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.371 0 0 5.371 0 12c0 6.627 5.371 12 12 12s12-5.373 12-12c0-6.629-5.371-12-12-12zm7.938 7.5c2.104 2.563 2.396 6.229.771 9.063-.293-.094-3.209-.992-6.521-.482-.07-.146-.133-.289-.207-.438-.07-.146-.146-.289-.221-.434 4.146-1.813 5.813-4.375 5.979-4.646zm-1.354-1.563c-1.396 1.979-3.396 4.021-5.646 5.021-1.771-3.229-3.646-5.896-3.938-6.313C7.938 3.646 9.896 3 12 3c2.021 0 3.896.604 5.354 1.688zm-7.229-.021c.271.354 2.063 2.771 3.771 5.896-5.229 1.563-9.771 1.521-10.188 1.521C2.021 6.938 4.229 4.5 7.021 3.229zm-6.938 8.5v-.229c.396.01 5.229.021 10.646-1.646.188.354.354.709.521 1.063-.084.021-.166.041-.25.063-4.938 1.354-7.646 5.021-7.938 5.438A8.93 8.93 0 0 1 3.833 11.729zm2.229 4.021c.229-.354 2.229-3.229 7.396-4.771 1.438 2.646 2.646 5.438 3.021 6.313-1.021.354-2.104.563-3.229.563-2.938 0-5.563-1.229-7.188-3.229zm9.938 3.021c-.271-.646-1.438-3.521-2.854-6.229 3.021-.438 5.646.271 5.938.354.021.146.021.292.021.438 0 2.229-.854 4.271-2.229 5.937-.271-.021-.563-.063-.876-.146zm2.021-1.021c1.021-1.438 1.688-3.188 1.771-5.021 1.938.271 3.646.771 3.938.854-.604 1.938-1.938 3.563-3.709 4.167z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
