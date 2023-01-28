import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import Feedback from "./Feedback";
import API from "../utils/API";

export default function Signup() {
  const [pseudo, set_pseudo] = useState("");
  const [password, set_password] = useState("");
  const [cpassword, set_cpassword] = useState("");
  const [money, set_money] = useState("");
  const [status, setStatus] = useState({
    open: false,
  });
  const [send, set_send] = useState(false);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

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
    if (!pseudo || pseudo.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    API.signup({ pseudo, password, money })
      .then((data) => HandleRedirecting(data))
      .catch((e) => console.log(e))
      .then(set_send(true));
  };

  const HandleRedirecting = (data) => {
    HandleStatus(data);
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      navigate("/", { replace: true });
    }, 3000);
  };

  const Formulaire = () => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1.5, width: "35ch" },
          textAlign: "center",
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
            label="Pseudo"
          />
        </div>
        <div>
          <TextField
            type="password"
            onChange={(e) => set_password(e.target.value)}
            value={password}
            label="Mot de passe"
          />
        </div>
        <div>
          <TextField
            type="password"
            onChange={(e) => set_cpassword(e.target.value)}
            value={cpassword}
            label="Confirme mot de passe"
          />
        </div>
        <div>
          <TextField
            type="number"
            onChange={(e) => set_money(e.target.value)}
            value={money}
            label="Quantité d'argent"
          />
        </div>
      </Box>
    );
  };

  const Footer = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Button sx={buttonSx} onClick={() => Send()}>
          VALIDE
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
            to="/login"
            style={{ color: "orange", textDecoration: "inherit" }}
          >
            connectez-vous
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
