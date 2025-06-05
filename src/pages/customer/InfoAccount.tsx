import { Link } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-purple-700-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Welcome User{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 z-10 bg-pink-500 divide-y divide-gray-100 rounded-lg shadow-sm w-44 
          ${isOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium truncate">name@flowbite.com</div>
        </div>
        <ul
          className=" text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <Link
              to="/user/profile"
              className="block px-4 py-1 hover:bg-pink-800 dark:hover:bg-pink-800 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/user/history_medical"
              className="block px-4 py-1 hover:bg-pink-800 dark:hover:bg-pink-800 dark:hover:text-white"
            >
              Lịch sử khám
            </Link>
          </li>
          <li>
            <Link
              to="/user/medical_record"
              className="block px-4 py-1 hover:bg-pink-800 dark:hover:bg-pink-800 dark:hover:text-white"
            >
              Hồ sơ bệnh án
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700  hover:bg-pink-800 dark:hover:bg-pink-800 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
