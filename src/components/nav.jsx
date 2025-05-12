import { NavLink } from "react-router-dom";
import NavList from "./navList";
import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import customAPI from "./../api";
import { logoutUser } from "./../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "./../slice/cartSlice";
import Header from "./header";

const Nav = () => {
  const user = useSelector((state) => state.userState?.user);
  const countCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlingLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCart()); // Menghapus isi keranjang setelah logout
      navigate("/");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCart());
      navigate("/");
    }
  };

  return (
    <>
      <nav className="bg-base-200">
        <div className="navbar mx-auto max-w-6xl px-8">
          <div className="navbar-start relative">
            <NavLink
              to="/"
              className="hidden lg:flex btn btn-primary text-3xl items-center"
            >
              Vite Shop
            </NavLink>
            {/* Mobile */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <FaBarsStaggered size={24} className="h-6 w-6" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content absolute top-full left-0 mt-2 z-[1] p-2 shadow bg-base-200 rounded-box w-52 animate-waterdrop"
              >
                <NavList />
              </ul>
            </div>
            {/* PC Devices */}
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal">
                <NavList />
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
              <div className="indicator">
                <BsCart3 size={24} />
                <span className="badge bg-primary badge-sm indicator-item">
                  {countCart}
                </span>
              </div>
            </NavLink>
            <Header />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
