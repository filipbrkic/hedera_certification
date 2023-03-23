const { PrivateKey, Client, AccountCreateTransaction, Hbar } = require("@hashgraph/sdk");
require('dotenv').config();

const treasuryId = process.env.MY_ACCOUNT_ID;
const treasuryAccount = process.env.MY_PRIVATE_KEY;

const treasuryClient = Client.forTestnet();
treasuryClient.setOperator(treasuryId, treasuryAccount);

// Create an async function to create accounts
async function createAccount(n) {
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;
    const tx = await new AccountCreateTransaction().setKey(newAccountPrivateKey)
        .setInitialBalance(new Hbar(500)).execute(treasuryClient);

    // Get accountId from receipt
    const accountId = (await tx.getReceipt(treasuryClient)).accountId;

    console.log(`ACCOUNT_ID_${n} = ${accountId.toString()}`);
    console.log(`PUBLIC_KEY_${n} = ${newAccountPublicKey.toString()}`);
    console.log(`PRIVATE_KEY_${n} = ${newAccountPrivateKey.toString()}`);
    console.log('\n')
}

// Create main async function to call createAccount 5 times
async function main() {
    for (let i = 1; i <= 5; i++) {
        await createAccount(i);
    }

    process.exit();
}

main();