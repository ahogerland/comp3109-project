# COMP3109 Project Team P1 - Padding Oracle Attack
- project preamble
- explanation of a "Padding Oracle Attack" using CBC mode and the PKCS7 padding scheme

## Getting Started
*This is a quick-start guide for running the server. See the [Oracle Server](#oracle-server) section for more information.*

Server launching instructions:
1. Install [Node.js](https://nodejs.org/en/download/)
2. Ensure that the `Backend/.env` and `Frontend/src/utils/utils.js` files exist and have the correct information.
3. Launch the backend. Execute the following commands in the project root:
```
> cd ./Backend
> npm install
> npm run dev
```
4. Launch the frontend. Execute the following commands in the project root:
```
> cd ./Frontend
> npm install
> npm run start
```

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
    return requests.post(URL, data={'secret': ciphertext.hex()}).status_code < 500

ciphertext = bytes.fromhex('3348858cabb261b221533429801bee239ec1ec7c853509c8a261fc2b2b2211b0')
print(validate(ciphertext))
```

## Ciphertext Generation
An example generation script can be found in `Scripts/gen-poa-challenge.py`.

## Solution
An example solution can be found in `Scripts/solution.py`.

---

# Oracle Server
The server comes in two seperate directories. They are as listed:

## Backend
This will accept any requests from the frontend which is hosting the webpage, or students can make http requests directly to the backend as well. The purpose of this directory is to decrypt incoming messages and checking their padding for the oracle padding attack. The directory structure is as follows:

    .
    ├── Backend
    │   ├── API_Gateways
    .   │   └── Student_Gateway.js (This file is used to provide the route for the student along with a precursory validation of the submitted information as part of the HTTP request)
    .   ├── Helpers
    .   │   └── asyncHandler.js (This file contains code to allow express routes to handle async function calls)
        ├── Services
        │   └── Student
        │       ├── Student_DB.js (This file would create transaction with a database if it existed, however instead it calls a decryption function to verify the padding of the ciphertext
        │       └── Student_Service.js (This file is used to seperate the database from the rest of the code in case additional work needs to be done)
        ├── .env (contains all of the configurable information for the server)
        ├── app.js (the file that launches the server along with creating the middleware for routing)
        ├── package-lock.json
        └── package.json

### .env
The only file that the operator of the server should be concerned about in the backend would be the .env file which
contains all of the configurable information for the server. If this file does not exist you will need to create it in
the Backend root directory with the following variables:

```
PORT=3001
FRONTEND_IP=10.0.0.2:3000
SECRET=a3b93dad09e1240c90aff28a036ca443
IV=70b3903e30bbf7587c9352b2e3dce51b
```

### Launching Instructions
1) npm install
2) ensure that the .env file exists and has the correct information
3) npm run dev

## Frontend
This directory works to serve a user-friendly webpage that students can submit their oracle padding attack attempts through to the backend. The directory structure is as follows:

    .
    ├── Frontend
    │   ├── public
    .   │   ├── favicon.ico
    .   │   ├── index.html
    .   │   └── robots.txt
        ├── src
        │   ├── components
        │   │   ├── InputComponent
        │   │   │   └── index.js (contains the code to display the input field for the webpage)
        │   │   └── index.js
        │   ├── pages
        │   │   ├── HomePage
        │   │   │   └── index.js (calls the input component)
        │   │   └── index.js
        │   ├── utils
        │   │   ├── css
        │   │   │   ├── forms.css
        │   │   │   ├── grid.css
        │   │   │   ├── main.css
        │   │   │   ├── modules.css
        │   │   │   ├── style.css
        │   │   │   └── type.css
        │   │   └── utils.js (contains the necessary backend ip to address the backend server)
        │   ├── App.js (stores all of the wbesite routes)
        │   └── index.j
        ├── package-lock.json
        └── package.json
  
### utils.js
The only file that the operator of the server should be concerned about in the frontend would be the utils.js file which
contains all of the configurable information for the server. If this file does not exist you will need to create it as:

```
// Frontend/src/utils/utils.js

export const backend_ip = "10.0.0.2:3001" // or whatever is the port and ip of the backend server
```

### Launching Instructions
1) npm install
2) ensure that the utils.js file exists and has the correct information
3) npm run start
