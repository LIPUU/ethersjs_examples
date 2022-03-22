const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
);
const address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e";
const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(
    `ETH balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH`
  );
};

main();
