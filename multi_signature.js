const { TransferTransaction, AccountCreateTransaction, KeyList, Hbar, HbarUnit, Client, AccountAllowanceApproveTransaction, PrivateKey, AccountId, TransactionId, AccountBalanceQuery } = require("@hashgraph/sdk")
require('dotenv').config();

const account1 = PrivateKey.fromString(process.env.PRIVATE_KEY_1);
const account1Id = process.env.ACCOUNT_ID_1;

const account2 = PrivateKey.fromString(process.env.PRIVATE_KEY_2);
const account2Id = process.env.ACCOUNT_ID_2;

const account3 = PrivateKey.fromString(process.env.PRIVATE_KEY_3);
const account3Id = process.env.ACCOUNT_ID_3;

const account4 = PrivateKey.fromString(process.env.PRIVATE_KEY_4);
const account4Id = process.env.ACCOUNT_ID_4;

const client1 = Client.forTestnet();
client1.setOperator(account1Id, account1);
client1.setDefaultMaxTransactionFee(new Hbar(100));

const client2 = Client.forTestnet();
client2.setOperator(account2Id, account2);
client2.setDefaultMaxTransactionFee(new Hbar(100));

const nodeId = [new AccountId(3)];

const newKey = new KeyList([
    account1.publicKey,
    account2.publicKey,
    account3.publicKey
], 2);

async function create_wallet() {
    const tx = await new AccountCreateTransaction()
        .setKey(newKey)
        .setInitialBalance(20)
        .freezeWith(client1)
        .execute(client1);

    const accountId = (await tx.getReceipt(client1)).accountId;

    console.log(`Private key: ${newKey}`);
    console.log(`Account ID: ${accountId}\n`);
    return accountId.toString()
}

async function spend1(keysId) {
    let transaction = new TransferTransaction()
        .addHbarTransfer(keysId, new Hbar(-10))
        .addHbarTransfer(account4Id, new Hbar(10))

    const txResponse = await transaction.execute(client1);
    const receipt = await txResponse.getReceipt(client1);
    console.log(receipt);
}

async function spend2(keysId) {
    let transaction = new TransferTransaction()
        .addHbarTransfer(keysId, new Hbar(-10))
        .addHbarTransfer(account4Id, new Hbar(10))
        .setNodeAccountIds(nodeId)
        .freezeWith(client1);

    const signature1 = account1.signTransaction(transaction);
    const signature2 = account2.signTransaction(transaction);

    transaction = transaction.addSignature(account1.publicKey, signature1).addSignature(account2.publicKey, signature2);

    const txResponse = await transaction.execute(client1);
    const receipt = await txResponse.getReceipt(client1);
    console.log(receipt);
}

async function main() {
    let accountId = await create_wallet();
    //let accountId = "0.0.3906134";
    // fails
    await spend1(accountId).catch(error => console.log(error.toString()));

    // succeeds
    await spend2(accountId);
    process.exit();
}

main();