require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { PORT, FIREBASE_AUTH_API_KEY } = process.env;

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

app.post("/register", (req, res) => {
  const { email, password, returnSecureToken } = req.body;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_AUTH_API_KEY}`;
  axios({
    method: "POST",
    url: url,
    data: {
      email,
      password,
      returnSecureToken,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => res.json(response.data))
    .catch((error) => {
      res.json(error.message);
      console.error(error);
    });
});

app.post("/login", (req, res) => {
  const { email, password, returnSecureToken } = req.body;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_AUTH_API_KEY}`;
  axios({
    method: "POST",
    url: url,
    data: {
      email,
      password,
      returnSecureToken,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => res.json(response.data))
    .catch((error) => {
      res.json(error.message);
      console.error(error);
    });
});

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log("===================================");
  console.log("Server started");
  console.log(`Listening on ${PORT}`);
});
