const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${process.env.INFURA_ID}`
);

const account1 = "0xeb45F88e322790CA2D96305FBD9B485b2058DD0b";
const account2 = "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8";

const privateKey1 = process.env.PRIVATE_KEY_1;
const wallet = new ethers.Wallet(privateKey1, provider);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const chainlinkAddress = "0xa36085F69e2889c224210F603D836748e7dC0088";
const contract = new ethers.Contract(chainlinkAddress, ERC20_ABI, provider);

const main = async () => {
  const balanceSenderBefore = await contract.balanceOf(account1);
  const balanceReceiverBefore = await contract.balanceOf(account2);
  console.log(`reading from ${chainlinkAddress}...`);
  console.log(`balance of sender before: ${balanceSenderBefore}`);
  console.log(`balance of receiver before: ${balanceReceiverBefore}`);

  const contractWithWallet = contract.connect(wallet);
  const tx = await contractWithWallet.transfer(account2, balanceSenderBefore);
  await tx.wait();

  console.log({ tx });

  const balanceSenderAfter = await contract.balanceOf(account1);
  const balanceReceiverAfter = await contract.balanceOf(account2);

  console.log(`balance of sender after: ${balanceSenderAfter}`);
  console.log(`balance of receiver after: ${balanceReceiverAfter}`);
};

main();
