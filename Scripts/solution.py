import requests

# input file containing the class ciphertext
FILE_IN = '../ciphertext.txt'

# output file that will contain the plaintext corresponding to the assigned challenge block to decrypt
FILE_OUT = '../poa-c002.txt'

# student challenge number corresponding to the assigned challenge block to decrypt
CID = 2

# CBC-mode block size in bits
BLOCK_SIZE = 16

# oracle server information
HOST = 'http://localhost:3000'
URL = f'{HOST}/student/attempt'


def xor(a, b):
    return bytes(x ^ y for (x, y) in zip(a, b))


def validate(c1, c2):
    return requests.post(URL, data={'ciphertext': (c1 + c2).hex()}).status_code < 500


def main():
    with open(FILE_IN) as f:
        ciphertext = bytes.fromhex(f.read())
        c1 = ciphertext[(CID - 2) * BLOCK_SIZE:(CID - 2) * BLOCK_SIZE + BLOCK_SIZE]
        c2 = ciphertext[(CID - 1) * BLOCK_SIZE:(CID - 1) * BLOCK_SIZE + BLOCK_SIZE]

    mask_byte2 = (0x100).to_bytes(BLOCK_SIZE, 'big')
    delta = [0 for _ in range(BLOCK_SIZE)]

    # calculate deltas for each byte in c1
    for i in range(1, BLOCK_SIZE + 1):
        # find delta that produces valid padding and ensure a padding of 0x01 in the first byte
        # if the first successful padding is not 0x01, then changing the second byte must produce an invalid padding
        while not validate(xor(c1, delta), c2) or (i == 1 and not validate(xor(xor(c1, delta), mask_byte2), c2)):
            delta[-i] = delta[-i] + 1

        if i == BLOCK_SIZE:
            break

        # modify discovered deltas to produce the next padding in p2
        # i.e. c1[j] ^ delta[j] ^ decrypt(c2)[j] = i => i + 1
        for j in range(1, i + 1):
            delta[-j] = delta[-j] ^ i ^ (i + 1)

    p2 = xor(delta, [BLOCK_SIZE for _ in range(BLOCK_SIZE)])

    with open(FILE_OUT, 'w') as f:
        print(p2.decode('utf-8'), file=f)


if __name__ == '__main__':
    main()