import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Context, UserProvider } from "../context/UserContext";

const Layout = () => {

  const { currentUser } = useContext(UserProvider) as Context;
  return (
    <>
      <nav className="flex items-center justify-center w-full p-8 bg-cyan-700">
        <ul className="flex justify-evenly w-4/5">
          <li className="bg-cyan-300 p-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-300">
            <Link to="/">TodoList</Link>
          </li>
          <div className="flex gap-8">
            <li className="bg-cyan-300 p-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-300">
              <Link to="/register">Register</Link>
            </li>
            {
              !currentUser && <li className="bg-cyan-300 p-2 rounded-xl font-bold cursor-pointer hover:bg-yellow-300">
                <Link to="/login">Login</Link>
              </li>
            }
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;