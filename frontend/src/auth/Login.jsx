import { useState, useContext } from "react";
import { login as loginApi } from "../api/api";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await loginApi(form);
    login(res.data);
    navigate("/problems");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={submit}
        className="bg-gray-950 p-8 rounded-xl w-96 shadow-lg border-2 border-amber-50 backdrop-blur-2xl"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Login
        </h2>

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
          Login
        </button>
      </form>
    </div>
  );
}
