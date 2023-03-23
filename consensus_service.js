const { Client, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, Hbar } = require("@hashgraph/sdk");
require('dotenv').config();

const account1 = PrivateKey.fromString(process.env.PRIVATE_KEY_1);
const account1Id = process.env.ACCOUNT_ID_1;

const client = Client.forTestnet()
    .setOperator(account1Id, account1)
    .setDefaultMaxTransactionFee(new Hbar(10));

async function createTopic() {
    let txResponse = await new TopicCreateTransaction().execute(client);
    let receipt = await txResponse.getReceipt(client);
    return receipt.topicId.toString();
}

async function send_message(topicId) {
    const message = new Date().toISOString();

    const response = await new TopicMessageSubmitTransaction({
        topicId,
        message
    }).execute(client);

    let receipt = await response.getReceipt(client);
    console.log(`\nSent message to topic: ${topicId}, message: ${message}`);
    return receipt.status.toString();
}

async function main() {
    let topicId = await createTopic();
    console.log(`Created topic with id: ${topicId}`)
    console.log(`Look at topic messages: https://hashscan.io/testnet/topic/${topicId}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await send_message(topicId);
    process.exit();
}

main();