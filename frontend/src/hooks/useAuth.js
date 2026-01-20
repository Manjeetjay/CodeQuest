import { useContext } from "react";
import { AuthContext } from "../auth/authContext";

export const useAuth = () => useContext(AuthContext);
