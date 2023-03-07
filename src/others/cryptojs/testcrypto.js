// ------------------------------------------------------------------------------------------------------------------------------------------
//                                                     A E S          E N C R Y P T I O N
// ------------------------------------------------------------------------------------------------------------------------------------------

var CryptoJS = require("crypto-js");

// Encrypt
let message = "Hello world";
console.log("Original message ::::::::::::::::::::::::::::", message);

var ciphertext = CryptoJS.AES.encrypt(message, "secret key 123").toString();
console.log("Encrypted message :::::::::::::::::::::::::::", ciphertext);

// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log("Decrypted message :::::::::::::::::::::::::::", originalText); //my message

// ------------------------------------------------------------------------------------------------------------------------------------------
//                                                     O B J E C T E N C R Y P T I O N
// ------------------------------------------------------------------------------------------------------------------------------------------

let data = [{ id: 1 }, { id: 2 }];

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(
  JSON.stringify(data),
  "secret key 123"
).toString();
console.log("Encrypted message :::::::::::::::::::::::::::", ciphertext);
// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log("Decrypted message :::::::::::::::::::::::::::", decryptedData);

// ------------------------------------------------------------------------------------------------------------------------------------------
//                                                     S H - 256         E N C R Y P T I O N
// ------------------------------------------------------------------------------------------------------------------------------------------

console.log("Original message ::::::::::::::::::::::::::::", message);

var ciphertext = CryptoJS.HmacSHA256(message, "secret key 123").toString();
console.log("Encrypted message sh256 :::::::::::::::::::::::::::", ciphertext);

// Decrypt
var decrypt = CryptoJS.createDecryptor();
decrypt.update(ciphertext);

var decrypted = decrypt.finalize();

console.log(decrypted);

console.log(
  "Decrypted message sh256 :::::::::::::::::::::::::::",
  decrypted
); //my message
