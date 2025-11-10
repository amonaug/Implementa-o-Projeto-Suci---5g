// backend/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const CryptoJS = require("crypto-js");
const EC = require("elliptic").ec;

const ec = new EC("curve25519");

const app = express();
app.use(cors());
app.use(express.json());


app.post("/descriptografar", (req, res) => {
  const { suci, publicKeyUE } = req.body;

  // operadora usa sua chave privada fixa
  const privateKey = fs.readFileSync("operator_private.txt", "utf8");
  const operatorKey = ec.keyFromPrivate(privateKey, "hex");


  const ueKey = ec.keyFromPublic(publicKeyUE, "hex");


  const sharedSecret = operatorKey.derive(ueKey.getPublic());

  const aesKey = CryptoJS.SHA256(sharedSecret.toString()).toString();

  const bytes = CryptoJS.AES.decrypt(suci, aesKey);
  const supiOriginal = bytes.toString(CryptoJS.enc.Utf8);

  res.json({ supiOriginal });
});

app.get("/operator-public", (req, res) => {
  const pub = fs.readFileSync("operator_public.txt", "utf8");
  res.json({ publicKey: pub });
});


app.listen(3001, () => console.log("✅ Backend operadora rodando"));
