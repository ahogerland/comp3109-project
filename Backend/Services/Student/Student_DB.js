require('dotenv').config()
const CryptoJS = require("crypto-js");
const crypto = require('crypto')

/*
 Function checks if the secret matches the one belonging to the student
*/
CompareSecret = async (args) => {
    if (!args) return {error: "No arguments were supplied", argumentError: true, responseCode: 400}
    if (!args.secret) return {error: "Secret could not be found", argumentError: true, responseCode: 400}

    // Compare padding attack (Josh / Alec)

    // const ciphertext = encryption('My secret message', process.env.SECRET, process.env.IV)
    // console.log(ciphertext)

    let result = decryption(args.secret, process.env.SECRET, process.env.IV)

    if (result.error || !result.success) return {error: 'Oracle: Incorrect Padding', responseCode: 500}
    if (result.success) return {success: true, msg: 'Oracle: Correct Padding', responseCode: 201, plaintext: result.plaintext}
    return {error: 'Unknown error', responseCode: 500}
}

module.exports = {
    CompareSecret: CompareSecret
}

/*
    ciphertext : utf8 string
    key : string
    iv : string
*/
encryption = (plaintext, secret, secret_iv) => {
    const key = CryptoJS.enc.Utf8.parse(secret)
    const iv = CryptoJS.enc.Utf8.parse(secret_iv)

    const encryptedCP = CryptoJS.AES.encrypt(plaintext, key, {iv: iv})
    let b64_encrypted = encryptedCP.toString()
    b64_encrypted = CryptoJS.enc.Base64.parse(b64_encrypted)
    const hex_encrypted = b64_encrypted.toString(CryptoJS.enc.Hex) 
    
    return hex_encrypted
}

/*
    ciphertext : hex string
    key : string
    iv : string
*/
decryption = (ciphertext, secret, secret_iv) => {
    try {
        const key = Buffer.from(secret, 'hex')
        const iv = Buffer.from(secret_iv, 'hex')

        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
        const decrypted = decipher.update(ciphertext, 'hex', 'utf8')

        return {success: true, plaintext: decipher.final('utf8')}
    } catch (e) {
        return {error: e}
    }
}

//decryption = (ciphertext, secret, secret_iv) => {
//    try {
//        ciphertext = ciphertext.split("=")[0]
//
//        const key = CryptoJS.enc.Utf8.parse(secret)
//        const iv = CryptoJS.enc.Utf8.parse(secret_iv)
//
//        const b64_decrypted = CryptoJS.enc.Hex.parse(ciphertext)
//        const bytes = b64_decrypted.toString(CryptoJS.enc.Base64)
//        const decrypted = CryptoJS.AES.decrypt(bytes, key, {iv: iv})
//        const plaintext = decrypted.toString(CryptoJS.enc.Utf8)
//
//        if (decrypted.sigBytes < 0) return {success: false, plaintext: plaintext}
//        return {success: true, plaintext: plaintext}
//    } catch (e) {
//        return {error: e}
//    }
//}


