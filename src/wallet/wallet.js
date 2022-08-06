import { elliptic, generateHash } from '../modules';

const INITIAL_BALANCE = 0;

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = elliptic.createKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data){
        return this.keyPair.sign(generateHash(data));
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