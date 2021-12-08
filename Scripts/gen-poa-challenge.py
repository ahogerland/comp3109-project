import hashlib
import sys

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad

BLOCK_SIZE = AES.block_size


def gen_poa_challenge(file_in, dir_out, number):
    with open(file_in) as f:
        pt_bytes = f.read().encode('utf-8')

    if len(pt_bytes) < (number + 1) * BLOCK_SIZE:
        print('Plaintext is too short for {} challenge files. Required: {} bytes'.format(number, (number + 1) * BLOCK_SIZE))
        exit(1)

    key = get_random_bytes(BLOCK_SIZE)
    iv = get_random_bytes(BLOCK_SIZE)

    cipher = AES.new(key, AES.MODE_CBC, iv=iv)
    ct_bytes = cipher.encrypt(pad(pt_bytes, BLOCK_SIZE))

    for challenge in range(number):
        with open('{}/poa-c{:03}.txt'.format(dir_out, challenge + 1), 'w') as f:
            b1 = challenge * BLOCK_SIZE
            b2 = (challenge + 1) * BLOCK_SIZE
            p2 = pt_bytes[b2: b2 + BLOCK_SIZE]

            print(ct_bytes[b1: b2 + BLOCK_SIZE].hex(), file=f)
            print('\nhashlib.sha3_224(p2).hexdigest()', file=f)
            print(hashlib.sha3_224(p2).hexdigest(), file=f)

    print('Provide the server with the following secrets:')
    print('KEY: {}\nIV:  {}'.format(key.hex(), iv.hex()))


if __name__ == '__main__':
    if len(sys.argv) >= 4:
        gen_poa_challenge(sys.argv[1], sys.argv[2].rstrip('/\\'), int(sys.argv[3]))
    else:
        print('Usage: python ./gen_poa_challenge FILE_IN DIR_OUT NUMBER')
        print('\nArgs:')
        print('  FILE_IN:   plaintext input file')
        print('  DIR_OUT:   output directory')
        print('  NUMBER:    number of challenge files to generate')
