# COMP3109 Project Team P1 - Padding Oracle Attack
- project preamble
- explanation of a "Padding Oracle Attack" using CBC mode and the PKCS7 padding scheme

## Getting Started
- server requirements, setup, usage instructions, whatever

---

# Challenge (Padding Oracle Attack)
An encrypted message has been intercepted while being sent to *-insert domain here-* and has been dumped into a file
named `ciphertext.txt` (encoded in hexadecimal). The destination server will decrypt any ciphertext message sent to
*-insert url here-* as a POST request. However, the message must be encrypted using **128-bit AES** encryption with
**CBC mode** of operation and the **PKCS7** padding scheme. An invalid padding will result in a server 500 error message.

You are tasked with decrypting one 16-byte block of the intercepted message using the *Padding Oracle Attack*. **Please
visit the Grades section in Brightspace to find your challenge number.** For example, if your challenge number is "c002"
then you must decrypt block number 2 (starting at 1, not zero).

Submit a single file named `poa-cXXX.txt` containing only the decrypted plaintext corresponding to your challenge block
(replacing "cXXX" with your challenge number).

TODO: something about verification hashes.

## Ciphertext Generation
An example generation script can be found in `Scripts/gen-poa-challenge.py`.

## Solution
An example solution can be found in `Scripts/solution.py`.
