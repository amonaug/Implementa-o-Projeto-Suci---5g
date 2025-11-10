import axios from "axios";
import EC from "elliptic";
import CryptoJS from "crypto-js";

const ec = new EC.ec("curve25519");

export async function gerarSUCI(supi) {
  const ueKey = ec.genKeyPair();
  const publicKeyUE = ueKey.getPublic("hex");


  const response = await axios.get("http://localhost:3001/operator-public");
  const publicKeyOperator = response.data.publicKey;

  const operatorKey = ec.keyFromPublic(publicKeyOperator, "hex");

  const sharedSecret = ueKey.derive(operatorKey.getPublic());


  const aesKey = CryptoJS.SHA256(sharedSecret.toString()).toString();

  // criptografar SUPI
  const suci = CryptoJS.AES.encrypt(supi, aesKey).toString();

  
  const decryptResponse = await axios.post("http://localhost:3001/descriptografar", {
    suci,
    publicKeyUE
  });

  return {
    suci,
    publicKeyUE,
    supiDescriptografado: decryptResponse.data.supiOriginal
  };
}
