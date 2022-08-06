import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1');
const INITIAL_BALANCE = 0;

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        const { balance, publicKey } = this;

        return ` Wallet -
            publicKey     : ${publicKey.toString()}
            balance       : ${balance}
        `;
    }
}

export { INITIAL_BALANCE };

export default Wallet;