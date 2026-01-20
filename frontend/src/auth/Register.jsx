import { useState, useContext } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./authContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    login(res.data)
    navigate("/problems")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={submit}
        className="bg-gray-950 p-8 rounded-xl w-96 shadow-lg border-2 border-amber-50"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-900"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-900"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-gray-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-900"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded font-semibold">
          Register
        </button>
      </form>
    </div>
  );
}
