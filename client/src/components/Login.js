import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import Feedback from "./Feedback";
import API from "../utils/API";

export default function Login() {
  let navigate = useNavigate();
  const [pseudo, set_pseudo] = useState("");
  const [password, set_password] = useState("");
  const [send, set_send] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState({
    open: false,
  });
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const HandleStatus = (info) => {
    const statu = {};
    if (info.status < 400) {
      statu.ok = true;
      statu.text = "Operation reussi";
    } else {
      statu.ok = false;
      statu.text = "Operation echoué";
    }
    statu.open = true;
    setStatus(statu);
  };

  const Send = async () => {
    if (pseudo || pseudo.length !== 0 || password || password.length !== 0) {
      API.login(pseudo, password)
        .then((info) => {
          HandleStatus(info);
          set_send(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleButtonClick = () => {
    if (pseudo.length > 0 && password.length > 0) {
      Send();
      if (!loading) {
        setSuccess(false);
        setLoading(true);
      }
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        navigate("/", { replace: true });
      }, 1000);
    }
  };

  const Formulaire = () => {
    return (
      <Box
        component="form"
        sx={{
          textAlign: "center",
          m: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            error={send && pseudo.length === 0}
            helperText={send && pseudo.length === 0 ? "A remplir" : ""}
            type="text"
            onChange={(e) => set_pseudo(e.target.value)}
            value={pseudo}
            label="Pseudo *"
          ></TextField>
          <TextField
            sx={{ width: "25%" }}
            type="password"
            onChange={(e) => set_password(e.target.value)}
            value={password}
            label="Mot de passe *"
          ></TextField>
        </div>
      </Box>
    );
  };

  const Footer = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}
        >
          CONNEXION
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
        <p>
          ou{" "}
          <Link
            to="/sign_up"
            style={{ color: "orange", textDecoration: "inherit" }}
          >
            {" "}
            identifiez vous
          </Link>
        </p>
      </Box>
    );
  };
  return (
    <>
      {Formulaire()}
      {Feedback({ ok: status.ok, text: status.text, open: status.open })}
      {Footer()}
    </>
  );
}
