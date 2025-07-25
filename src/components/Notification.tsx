import { useRef, useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";

const Notification = () => {
  // Danh sách thông báo mẫu, có thể thay bằng props hoặc fetch API
  const { notifications, markAllAsRead, markAsRead } = useNotification();
  // Để test trạng thái không có thông báo, setNotifications([])

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAllAsRead = markAllAsRead;
  const handleMarkAsRead = markAsRead;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative inline-flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          className="w-6 h-6 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.filter((n) => !n.isRead).length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full">
            {notifications.filter((n) => !n.isRead).length}
          </div>
        )}
      </button>

      <div
        className={`absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-200 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Thông báo</h3>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-pink-600 hover:text-pink-700"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-pink-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="mt-2">Không có thông báo mới</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  !item.isRead ? "bg-pink-50" : ""
                }`}
                onClick={() => handleMarkAsRead(item.id)}
              >
                <img
                  src={item.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
                {!item.isRead && (
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-gray-100 text-center">
          <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
            Xem tất cả thông báo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
