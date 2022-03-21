const { ethers } = require("ethers");

const INFURA_ID = "b3392ed655be4f0d9345569b4cec4ce2";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);
const address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e";
const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(
    `ETH balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH`
  );
};

main();
