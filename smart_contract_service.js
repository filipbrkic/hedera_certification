const {
    Client,
    Hbar,
    ContractCreateFlow,
    ContractExecuteTransaction,
    ContractFunctionParameters,
} = require("@hashgraph/sdk");
require('dotenv').config();

const account1 = process.env.PRIVATE_KEY_1;
const account1Id = process.env.ACCOUNT_ID_1;

const client = Client.forTestnet();
client.setOperator(account1Id, account1);
client.setDefaultMaxTransactionFee(new Hbar(100));

const contractJson = require("./CertificationC1.json");

async function deployContract() {
    const contractTx = await new ContractCreateFlow()
        .setBytecode(contractJson.bytecode)
        .setGas(100_000)
        .execute(client);

    const contractId = (await contractTx.getReceipt(client)).contractId;
    return contractId;
}

async function interactWithContractFunction1(contractId) {
    const tx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100_000)
        .setFunction("function1", new ContractFunctionParameters().addUint16(4).addUint16(3))
        .execute(client);

    let record = await tx.getRecord(client);

    return Buffer.from((record).contractFunctionResult.bytes).toJSON().data.at(-1);
}

async function interactWithContractFunction2(contractId, n) {
    const tx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100_000)
        .setFunction("function2", new ContractFunctionParameters().addUint16(n))
        .execute(client);

    return Buffer.from((await tx.getRecord(client)).contractFunctionResult.bytes).toJSON().data.at(-1);
}

async function main() {
    let contractId = await deployContract();
    let result1 = await interactWithContractFunction1(contractId);
    console.log('function 1: ', result1);
    let result2 = await interactWithContractFunction2(contractId, result1);
    console.log('function 2: ', result2);

    process.exit();
}

main();