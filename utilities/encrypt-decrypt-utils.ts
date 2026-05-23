import CryptoJS from "crypto-js";
import dotenv from "dotenv";
//const secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
dotenv.config({ path: "./env/.env" });
const secretKey = process.env.SECRET_KEY || "";

console.log("this is secretKey", secretKey);

if (!secretKey) {
  throw new Error("SECRET_KEY is missing in .env file");
}

export function encryptData(data: string) {
  return CryptoJS.AES.encrypt(data, secretKey);
}

export function decryptData(encdata: string): string {
  console.log(process.env.SECRET_KEY);
  return CryptoJS.AES.decrypt(encdata, secretKey).toString(CryptoJS.enc.Utf8);
}
