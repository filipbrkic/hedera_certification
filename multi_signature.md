Run: `npm run multi_signature`

### Output when `let accountId = await create_wallet();`:

Private key: {"threshold":2,"keys":"302a300506032b65700321004f169b637450ff08c37d3f4b39cf7cd261c75e0a5be05fd3c5a6bcd83aa5c281,302a300506032b657003210078064dcd1d3449d0dbccf6cf92d7fe5007b0264f015b7a50221aae525b15329f,302a300506032b6570032100810406daca7096f88042890f3bdb60456840761246511a1f186f2d8fe6ca1e58"}
Account ID: 0.0.3906134

{"name":"StatusError","status":"INVALID_SIGNATURE","transactionId":"0.0.3904686@1679570573.447547599","message":"receipt for transaction 0.0.3904686@1679570573.447547599 contained error status INVALID_SIGNATURE"}
TransactionReceipt {
  status: Status { _code: 22 },
  accountId: null,
  fileId: null,
  contractId: null,
  topicId: null,
  tokenId: null,
  scheduleId: null,
  exchangeRate: ExchangeRate {
    hbars: 30000,
    cents: 184198,
    expirationTime: 2023-03-23T12:00:00.000Z,
    exchangeRateInCents: 6.1399333333333335
  },
  topicSequenceNumber: Long { low: 0, high: 0, unsigned: false },
  topicRunningHash: Uint8Array(0) [],
  totalSupply: Long { low: 0, high: 0, unsigned: false },
  scheduledTransactionId: null,
  serials: [],
  duplicates: [],
  children: []
}

### Output when `let accountId = "0.0.3906134"`:

{"name":"StatusError","status":"INVALID_SIGNATURE","transactionId":"0.0.3904686@1679570868.672659992","message":"receipt for transaction 0.0.3904686@1679570868.672659992 contained error status INVALID_SIGNATURE"}
TransactionReceipt {
  status: Status { _code: 22 },
  accountId: null,
  fileId: null,
  contractId: null,
  topicId: null,
  tokenId: null,
  scheduleId: null,
  exchangeRate: ExchangeRate {
    hbars: 30000,
    cents: 184198,
    expirationTime: 2023-03-23T12:00:00.000Z,
    exchangeRateInCents: 6.1399333333333335
  },
  topicSequenceNumber: Long { low: 0, high: 0, unsigned: false },
  topicRunningHash: Uint8Array(0) [],
  totalSupply: Long { low: 0, high: 0, unsigned: false },
  scheduledTransactionId: null,
  serials: [],
  duplicates: [],
  children: []
}
