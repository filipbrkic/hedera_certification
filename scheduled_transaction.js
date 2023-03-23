const {
    PrivateKey,
    Transaction,
    TransferTransaction,
    Hbar,
    ScheduleCreateTransaction,
    Client
} = require("@hashgraph/sdk")
require('dotenv').config();

const account1 = PrivateKey.fromString(process.env.PRIVATE_KEY_1)
const account1Id = process.env.ACCOUNT_ID_1

const account2 = PrivateKey.fromString(process.env.PRIVATE_KEY_2)
const account2Id = process.env.ACCOUNT_ID_2

const client = Client.forTestnet();
client.setOperator(account1Id, account1);

async function scheduleTransaction(from, to, amount, fromPrivateKey) {
    // 10Hbar from account 1 to account 2
    const tx = new TransferTransaction()
        .addHbarTransfer(from, new Hbar(`-${amount}`))
        .addHbarTransfer(to, new Hbar(amount));

    // Freeze the transaction with the client and convert it to bytes
    const txBytes = new ScheduleCreateTransaction()
        .setScheduledTransaction(tx)
        .setAdminKey(fromPrivateKey)
        .freezeWith(client)
        .toBytes();

    // Convert the bytes to base64 encoding
    const base64Tx = Buffer.from(txBytes).toString('base64');
    console.log(`Base64 encoded tx: ${base64Tx}`);
    return base64Tx;
}

async function deserializeTransaction(base64Tx) {
    const tx = await Transaction.fromBytes(Buffer.from(base64Tx, 'base64'))
        .sign(account1);

    await tx.execute(client);
    console.log(`\nTransaction: ${tx.transactionId}`);
}

async function main() {
    const serializedTx = await scheduleTransaction(account1Id, account2Id, 10, account1);
    await deserializeTransaction(serializedTx);
    process.exit();
}

main();