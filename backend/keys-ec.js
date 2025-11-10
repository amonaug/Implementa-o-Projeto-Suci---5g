// backend/gen-operator-keys.js
const EC = require("elliptic").ec;
const fs = require("fs");

const ec = new EC("curve25519");

function gerarChavesOperadora() {
  const key = ec.genKeyPair();

  const publicKey = key.getPublic("hex");
  const privateKey = key.getPrivate("hex");

  fs.writeFileSync("operator_public.txt", publicKey);
  fs.writeFileSync("operator_private.txt", privateKey);

  console.log("✅ Chaves da operadora criadas!");
  console.log("📌 Public:", publicKey);
}

gerarChavesOperadora();
