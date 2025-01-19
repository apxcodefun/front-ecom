import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../slice/userSlice"; // Contoh action untuk logout

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false); // Tutup dropdown setelah logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  return (
    <>
      {user ? (
        <div className="flex gap-x-4 items-center relative">
          <p className="text-xs sm:text-sm">Hello {user.name}</p>
          {/* Gambar Profil */}
          <img
            src="avatar.jpg" // Default avatar jika tidak ada foto profil
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown saat klik gambar
          />
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg py-2 text-neutral-content z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-neutral"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-x-6 justify-center items-center">
          <Link to="/login" className="link link-hover text-xs sm:text-sm">
            Sign In
          </Link>
          <Link to="/register" className="link link-hover text-xs sm:text-sm">
            Create Account
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
