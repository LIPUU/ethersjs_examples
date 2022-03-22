const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${process.env.INFURA_ID}`
);

const account1 = "0xeb45F88e322790CA2D96305FBD9B485b2058DD0b";
const account2 = "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8";

const privateKey1 = process.env.PRIVATE_KEY_1;
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  // Show account 1 balance before transfer
  const senderBalanceBefore = await provider.getBalance(account1);
  // Show account 2 balance before transfer
  const receiverBalanceBefore = await provider.getBalance(account2);

  console.log(
    `sender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `receiver balance before: ${ethers.utils.formatEther(
      receiverBalanceBefore
    )}`
  );

  // Send ethers
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.025"),
  });

  // Wait for txn to be mined
  await tx.wait();
  console.log(tx);

  const senderBalanceAfter = await provider.getBalance(account1);
  const receiverBalanceAfter = await provider.getBalance(account2);

  console.log(
    `sender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}`
  );
};

main();
