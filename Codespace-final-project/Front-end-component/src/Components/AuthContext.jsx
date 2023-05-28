import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const navigate = useNavigate()
  const location = useLocation();


  const [token, setToken] = useState(localStorage.getItem("token"));
  const [categoryprof, setCategoryprof] = useState(localStorage.getItem("categoryprof"));
  const [active, setActive] = useState(localStorage.getItem("active"));

  useEffect(() => {
    if (token) {
      if ((token === undefined) || (token === null)) {
        localStorage.removeItem("token");
      }
      else {
        const id = localStorage.getItem("id");

        fetch(`http://localhost:9000/users/getuser/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }).then((res) => res.json())
          .then((data) => {
            if (data.result === "KO") {
              localStorage.removeItem("token");
              navigate("/landingNotAuth");

            }
            else {
              localStorage.setItem("token", token);
              localStorage.setItem("categoryprof", categoryprof);
              localStorage.setItem("active", active);

            }
          });
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("categoryprof");
      localStorage.removeItem("active");
    }

  }, [token]);

  if (!token) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (
    <AuthContext.Provider value={{ token, setToken, categoryprof, setCategoryprof, active, setActive }}>
      {props.children}
    </AuthContext.Provider>
  );
};