import hre from 'hardhat';

async function main() {
  const { ethers } = hre;
  const membershipFee = ethers.parseUnits("10", 18);

  const VibePayments = await ethers.getContractFactory("VibePayments");
  const vibePayments = await VibePayments.deploy(membershipFee);

  await vibePayments.waitForDeployment();
  
  const contractAddress = await vibePayments.getAddress();

  console.log(`VibePayments contract deployed to address: ${contractAddress}`);
  console.log(`Membership Fee set to: ${ethers.formatUnits(membershipFee, 18)} ARB`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});