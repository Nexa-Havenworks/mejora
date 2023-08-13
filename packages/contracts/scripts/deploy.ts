import { ethers, config } from "hardhat";
import fs from "fs";
import path from "path";

interface DeploymentInfo {
  timestamp: string;
  address: string;
  // network: string;
}

async function main() {
  const messageBoard = await ethers.deployContract('MessageBoard') as any;

  await messageBoard.waitForDeployment();

  const deploymentInfo: DeploymentInfo = {
    timestamp: new Date().toISOString(),
    address: messageBoard.target,
  };

  const logFilePath = path.join(__dirname, "deployments.log");
  const logEntry = `${JSON.stringify(deploymentInfo)}\n`;

  fs.appendFileSync(logFilePath, logEntry, "utf-8");

  console.log(
    `MessageBoard deployed to ${messageBoard.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
