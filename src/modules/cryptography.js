import Elliptic from 'elliptic';
import hash from './hash';

const ec = new Elliptic.ec('secp256k1');

export default {
    createKeyPair: () => ec.genKeyPair(),

    VerifySignature: (publicKey, signature, data) => {
        return ec.keyFromPublic(publicKey, 'hex').verify(hash(data), signature);
    },
};