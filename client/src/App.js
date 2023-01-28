import Login from "./components/Login";
import API from "./utils/API.js";
import Box from "@mui/material/Box";
import Market from "./components/Market";
import Signup from "./components/Signup";
import { Navigate, Route, Routes } from "react-router-dom";

/**
 * Return the home page, with the login or register.
 * @returns Home page of this site of this type : div className="Menu"
 */
function App() {
  return (
    <div className="Menu">
      <header className="App-header">
        <Box sx={{ textAlign: "center" }}>
          <h1>Nozama</h1>
        </Box>
        <Routes>
          <Route
            exact
            path="/"
            element={
              API.isAuth() ? <Market /> : <Navigate replace to="/login" />
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign_up" element={<Signup />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
