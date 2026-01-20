import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-gray-950">
      <h1 className="text-xl font-bold text-white">CodeQuest</h1>

      <div className="flex gap-6 items-center">
        <Link to="/problems" className="text-white hover:text-blue-500">
          Problems
        </Link>
        <Link to="/login" className="text-white hover:text-blue-500">
          Log in
        </Link>
        <Link
          to="/register"
          className=" text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:text-gray-950 hover:font-extrabold"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
