import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setAuth } from "../store/authSlice";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      const user = jwtDecode(token);
      dispatch(setAuth({ token, user }));
    }
    navigate("/learn/ai");
  }, []);

  return <p style={{ color: "#fff", textAlign: "center", marginTop: "5rem" }}>Logging you in...</p>;
}