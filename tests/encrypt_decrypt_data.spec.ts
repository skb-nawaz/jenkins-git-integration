import { test } from "@playwright/test";
import CryptoJs from "crypto-js";
import dotenv from "dotenv";
import { encryptData, decryptData } from "../utilities/encrypt-decrypt-utils";
import securedata from "../testdata/securedata.json";

// test("encrypted data", async ({ page }) => {});

test.only("Encrypt Decrypt Sensitive Data in Playwright", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  dotenv.config({ path: "./env/.env" });
  const secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";

  console.log("secret key:", secretKey);
  // const encryptedUserName = CryptoJs.AES.encrypt(
  //   "standard_user",
  //   secretKey,
  // ).toString();
  // console.log("encrypted user name:", encryptedUserName);

  // const encryptedPassword = CryptoJs.AES.encrypt(
  //   "secret_sauce",
  //   secretKey,
  // ).toString();
  // console.log("encryptedPassword:", encryptedPassword);

  const encryptedUserName = "U2FsdGVkX19aJnqmoY3TWa8dFZIRjF/Aeq+IdOFdi3k=";
  const encryptedPassword = "U2FsdGVkX1+ztyEedN5K+g0BhEOWk0IOT3qdjC8dhA4=";

  const decryptedUserName = CryptoJs.AES.decrypt(
    encryptedUserName,
    secretKey,
  ).toString(CryptoJs.enc.Utf8);
  //console.log("decryptedUserName:", decryptedUserName);

  const decryptedPassword = CryptoJs.AES.decrypt(
    encryptedPassword,
    secretKey,
  ).toString(CryptoJs.enc.Utf8);

  await page.locator('[data-test="username"]').fill(decryptedUserName);
  await page.locator('[data-test="password"]').fill(decryptedPassword);

  // console.log("decryptedPassword:", decryptedPassword);

  await page.locator('[data-test="login-button"]').click();
});
/* 
test("Using utilities file Encrypt Decrypt Sensitive Data in Playwright", async ({
  page,
}) => {
  dotenv.config({ path: "./env/.env" });
  await page.goto("https://www.saucedemo.com/");

  const userName: any = process.env.user_name ? process.env.user_name : "";
  const pass: any = process.env.user_pass ? process.env.user_pass : "";

  console.log("this is process.env", process.env.user_name);

  const encUserName = encryptData(userName.toString());

  const encPassword = encryptData(pass.toString());

  const decUserName = decryptData(encUserName.toString());

  const decPassword = decryptData(encPassword.toString());

  await page.locator('[data-test="username"]').fill(decUserName);
  await page.locator('[data-test="password"]').fill(decPassword);

  // console.log("decryptedPassword:", decryptedPassword);
  await page.locator('[data-test="login-button"]').click();
}); */

//store credentials in env
test.only("Store encrypted data in env file", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";

  const encUserName: any = process.env.encryptedUserName;
  const encPassword: any = process.env.encryptedPassword;

  const decryptedUserName = decryptData(encUserName);
  const decryptedPassword = decryptData(encPassword);

  await page.locator('[data-test="username"]').fill(decryptedUserName);
  await page.locator('[data-test="password"]').fill(decryptedPassword);

  await page.locator('[data-test="login-button"]').click();
});

//store credentials in json file
test.only("Store encrypted data in json file", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const secretKey = securedata.SECRET_KEY ? securedata.SECRET_KEY : "";

  const encUserName: any = securedata.encryptedUserName;

  const encPassword: any = securedata.encryptedPassword;

  const decryptedUserName = decryptData(encUserName);

  const decryptedPassword = decryptData(encPassword);

  await page.locator('[data-test="username"]').fill(decryptedUserName);

  await page.locator('[data-test="password"]').fill(decryptedPassword);

  await page.locator('[data-test="login-button"]').click();
});
