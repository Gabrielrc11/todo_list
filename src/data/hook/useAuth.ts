import { useContext } from "react";
import AuthContext from "../context/AuthContex"

const useAuth = () => useContext(AuthContext)

export default useAuth