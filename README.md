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

The ciphertext has been chopped into multiple files, each labelled with a challenge number, containing pairs of
contiguous blocks. In other words, each file contains two blocks (32 bytes) of hex encoded ciphertext. For the ciphertext
`c = c1 | c2 | c3 | ...`, the file `poa-c001.txt` contains `c1 | c2`, and `poa-c002.txt` contains `c2 | c3`, etc.

**Please visit the Grades section in Brightspace to find your challenge number.**
You are tasked with decrypting one 16-byte block of the intercepted message using the *Padding Oracle Attack*. The first
line in your challenge file contains two blocks, call them `c1 | c2`. You must decrypt `c2` and then submit the plaintext
in UTF-8 format in a single file named `poa-cXXX.txt` (replacing "cXXX" with your challenge number).

Each file will also have the SHA-3 hash of the plaintext corresponding to block `c2`, along with the Python code used
to generate the hash. You may use this to verify your answer before submitting.

Hint: Here is some example code for communicating with the server via Python.
```python
import requests

# oracle server information
HOST = 'http://example.com'
URL = f'{HOST}/student/attempt'

def validate(ciphertext):
    return requests.post(URL, data={'ciphertext': ciphertext.hex()}).status_code < 500

ciphertext = bytes.fromhex('3348858cabb261b221533429801bee239ec1ec7c853509c8a261fc2b2b2211b0')
print(validate(ciphertext))
```

## Ciphertext Generation
An example generation script can be found in `Scripts/gen-poa-challenge.py`.

## Solution
An example solution can be found in `Scripts/solution.py`.
