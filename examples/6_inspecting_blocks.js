const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
);

const main = async () => {
  const latestBlock = await provider.getBlockNumber();
  const blockInfo = await provider.getBlock(latestBlock);

  const { transactions } = await provider.getBlockWithTransactions(latestBlock);
  console.log(`first transaction in block #${blockInfo.number}:`);
  console.log(transactions[0]);
};

main();
